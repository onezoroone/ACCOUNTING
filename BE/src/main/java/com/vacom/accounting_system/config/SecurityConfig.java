package com.vacom.accounting_system.config;

import com.vacom.accounting_system.service.UserDetailsServiceImpl;
import com.vacom.accounting_system.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .securityContext(securityContext -> securityContext.requireExplicitSave(false))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/accounts").hasAnyAuthority("VIEW_ACCOUNT")
                        .requestMatchers(HttpMethod.POST, "/api/accounts").hasAnyAuthority("CREATE_ACCOUNT")
                        .requestMatchers(HttpMethod.PUT, "/api/accounts/**").hasAnyAuthority("EDIT_ACCOUNT")
                        .requestMatchers(HttpMethod.DELETE, "/api/accounts/**").hasAnyAuthority("DELETE_ACCOUNT")
                        .requestMatchers(HttpMethod.GET, "/api/vouchers").hasAnyAuthority("VIEW_VOUCHER")
                        .requestMatchers(HttpMethod.POST, "/api/vouchers").hasAnyAuthority("CREATE_VOUCHER")
                        .requestMatchers(HttpMethod.PUT, "/api/vouchers/**").hasAnyAuthority("EDIT_VOUCHER")
                        .requestMatchers(HttpMethod.POST, "/api/vouchers/**/print").hasAnyAuthority("PRINT_VOUCHER")
                        .requestMatchers(HttpMethod.GET, "/api/partners").hasAnyAuthority("VIEW_PARTNER")
                        .requestMatchers(HttpMethod.POST, "/api/partners").hasAnyAuthority("CREATE_PARTNER")
                        .requestMatchers(HttpMethod.GET, "/api/users").hasAnyAuthority("VIEW_USER")
                        .requestMatchers(HttpMethod.POST, "/api/users").hasAnyAuthority("CREATE_USER")
                        .requestMatchers("/api/account-ledger/report/**").hasAnyAuthority("VIEW_ACCOUNT_LEDGER")
                        .requestMatchers("/api/roles/**").hasAnyAuthority("MANAGE_ROLES")
                        .requestMatchers("/api/permissions/**").hasAnyAuthority("MANAGE_PERMISSIONS")
                        .anyRequest().authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}