package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.request.LoginRequest;
import com.vacom.accounting_system.dto.request.RegisterRequest;
import com.vacom.accounting_system.dto.response.AuthResponse;
import com.vacom.accounting_system.service.AuthService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining("; "));
            log.warn("Validation failed for authentication: {}", errorMessage);
            return ResponseEntity.status(401).body(
                    AuthResponse.builder()
                            .authenticated(false)
                            .errorMessage(errorMessage)
                            .build()
            );
        }

        try {
            AuthResponse response = authService.authenticate(loginRequest);
            if (response.isAuthenticated()) {
                log.info("User {} authenticated successfully", loginRequest.getUsername());
                return ResponseEntity.ok(response);
            } else {
                log.warn("Authentication failed for user: {}", loginRequest.getUsername());
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            log.error("Authentication error for user: {}", loginRequest.getUsername(), e);
            return ResponseEntity.status(401).body(
                    AuthResponse.builder()
                            .authenticated(false)
                            .errorMessage("Invalid request: " + e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining("; "));
            log.warn("Validation failed for registration: {}", errorMessage);
            return ResponseEntity.status(400).body(
                    AuthResponse.builder()
                            .authenticated(false)
                            .errorMessage(errorMessage)
                            .build()
            );
        }

        try {
            AuthResponse response = authService.registerUser(registerRequest);
            if (response.isAuthenticated()) {
                log.info("User {} registered successfully", registerRequest.getUsername());
                return ResponseEntity.ok(response);
            } else {
                log.warn("Registration failed for user: {}", registerRequest.getUsername());
                return ResponseEntity.status(400).body(response);
            }
        } catch (Exception e) {
            log.error("Registration error for user: {}", registerRequest.getUsername(), e);
            return ResponseEntity.status(400).body(
                    AuthResponse.builder()
                            .authenticated(false)
                            .errorMessage("Invalid request: " + e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> invalidateSession(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        try {
            String token = extractTokenFromHeader(authorizationHeader);
            if (token == null || token.isEmpty()) {
                log.warn("No valid Authorization header provided for logout");
                return ResponseEntity.badRequest().body(
                        AuthResponse.builder()
                                .authenticated(false)
                                .errorMessage("No valid token provided")
                                .build()
                );
            }

            AuthResponse response = authService.invalidateSession(token);
            if (!response.isAuthenticated()) {
                log.info("User {} logged out successfully with token: {}", response.getUsername(), token);
                return ResponseEntity.ok(response);
            } else {
                log.warn("Logout failed: Invalid token");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            log.error("Logout error for token", e);
            return ResponseEntity.badRequest().body(
                    AuthResponse.builder()
                            .authenticated(false)
                            .errorMessage("Invalid request: " + e.getMessage())
                            .build()
            );
        }
    }

    private String extractTokenFromHeader(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }
        return authorizationHeader.substring(7).trim();
    }
}