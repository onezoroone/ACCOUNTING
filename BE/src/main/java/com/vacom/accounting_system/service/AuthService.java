package com.vacom.accounting_system.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.vacom.accounting_system.config.JwtUtil;
import com.vacom.accounting_system.dto.request.LoginRequest;
import com.vacom.accounting_system.dto.request.RegisterRequest;
import com.vacom.accounting_system.dto.response.AuthResponse;
import com.vacom.accounting_system.entity.Role;
import com.vacom.accounting_system.entity.User;
import com.vacom.accounting_system.exception.RoleNotFoundException;
import com.vacom.accounting_system.repository.RoleRepository;
import com.vacom.accounting_system.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthResponse authenticate(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = generateJwtToken(loginRequest.getUsername());

            log.info("User {} authenticated successfully", loginRequest.getUsername());
            return AuthResponse.builder()
                    .authenticated(true)
                    .token(token)
                    .username(loginRequest.getUsername())
                    .message("Logged in successfully")
                    .errorMessage(null)
                    .build();
        } catch (Exception e) {
            log.error("Authentication failed for user: {}", loginRequest.getUsername(), e);
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage("Invalid credentials")
                    .build();
        }
    }

    @Transactional
    public AuthResponse registerUser(RegisterRequest registerRequest) {
        if (registerRequest.getUsername() == null || registerRequest.getUsername().trim().isEmpty()) {
            log.warn("Username is missing or empty");
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage("Username is required")
                    .build();
        }

        if (registerRequest.getPassword() == null || registerRequest.getPassword().trim().isEmpty()) {
            log.warn("Password is missing or empty");
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage("Password is required")
                    .build();
        }

        if (registerRequest.getFullname() == null || registerRequest.getFullname().trim().isEmpty()) {
            log.warn("Full name is missing or empty");
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage("Full name is required")
                    .build();
        }

        if (registerRequest.getEmail() == null || registerRequest.getEmail().trim().isEmpty()) {
            log.warn("Email is missing or empty");
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage("Email is required")
                    .build();
        }

        // Kiểm tra username có tồn tại không
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            log.warn("Username {} already exists", registerRequest.getUsername());
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage("Username already exists")
                    .build();
        }

        // Kiểm tra email có tồn tại không
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            log.warn("Email {} already exists", registerRequest.getEmail());
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage("Email already exists")
                    .build();
        }

        User user = User.builder()
                .username(registerRequest.getUsername().trim())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .fullName(registerRequest.getFullname().trim())
                .email(registerRequest.getEmail().trim())
                .build();

        Role userRole;
        try {
            userRole = roleRepository.findByRoleName("VIEWER")
                    .orElseThrow(() -> new RoleNotFoundException("Default role VIEWER not found"));
        } catch (RoleNotFoundException e) {
            log.error("Failed to find default role USER: {}", e.getMessage());
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage(e.getMessage())
                    .build();
        }

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);
        log.info("User {} registered successfully", registerRequest.getUsername());

        return AuthResponse.builder()
                .authenticated(true)
                .token(null)
                .username(registerRequest.getUsername())
                .message("Registered successfully")
                .build();
    }

    public AuthResponse invalidateSession(String token) {
        if (token == null || token.trim().isEmpty()) {
            log.warn("No token provided for logout");
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage("No token provided")
                    .build();
        }

        try {
            String username = jwtUtil.extractUsername(token);
            if (username == null) {
                log.warn("Cannot extract username from token during logout: {}", token);
                return AuthResponse.builder()
                        .authenticated(false)
                        .errorMessage("Invalid token format")
                        .build();
            }

            if (jwtUtil.validateToken(token)) {
                SecurityContextHolder.clearContext();
                log.info("User {} logged out successfully with token: {}", username, token);
                return AuthResponse.builder()
                        .authenticated(false)
                        .token(null)
                        .username(username)
                        .message("Logged out successfully")
                        .build();
            } else {
                log.warn("Invalid token during logout: {}", token);
                return AuthResponse.builder()
                        .authenticated(false)
                        .errorMessage("Invalid token")
                        .build();
            }
        } catch (Exception e) {
            log.error("Error processing logout with token: {}", token, e);
            return AuthResponse.builder()
                    .authenticated(false)
                    .errorMessage("Error during logout: " + e.getMessage())
                    .build();
        }
    }

    private String generateJwtToken(String username) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(username)
                .issuer("accounting-system")
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("customClaim", "customValue")
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);

        try {
            jwsObject.sign(new MACSigner(jwtUtil.getSignerKey().getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot sign token", e);
            throw new RuntimeException("Failed to generate JWT token", e);
        }
    }
}