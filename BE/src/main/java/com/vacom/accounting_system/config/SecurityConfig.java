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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // ✅ Kích hoạt CORS
                .securityContext(securityContext -> securityContext.requireExplicitSave(false))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/api/auth/**",
                                "/v3/api-docs/**",
                                "/v3/api-docs.yaml",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/master-data/accounts").hasAnyAuthority("VIEW_ACCOUNT")
                        .requestMatchers(HttpMethod.POST, "/api/master-data/accounts").hasAnyAuthority("CREATE_ACCOUNT")
                        .requestMatchers(HttpMethod.PUT, "/api/master-data/accounts/**").hasAnyAuthority("EDIT_ACCOUNT")
                        .requestMatchers(HttpMethod.DELETE, "/api/master-data/accounts/**").hasAnyAuthority("EDIT_ACCOUNT")
                        .requestMatchers(HttpMethod.GET, "/api/reports/account-ledger/report").hasAnyAuthority("VIEW_ACCOUNT_LEDGER")
                        .requestMatchers(HttpMethod.POST, "/api/reports/account-ledger").hasAnyAuthority("CREATE_VOUCHER")
                        .requestMatchers(HttpMethod.PUT, "/api/reports/account-ledger/**").hasAnyAuthority("EDIT_VOUCHER")
                        .requestMatchers(HttpMethod.DELETE, "/api/reports/account-ledger/**").hasAnyAuthority("EDIT_VOUCHER")
                        .requestMatchers(HttpMethod.GET, "/api/reports/trial-balance/**").hasAnyAuthority("VIEW_TRIAL_BALANCE")
                        .requestMatchers(HttpMethod.GET, "/api/master-data/entities").hasAnyAuthority("VIEW_PARTNER")
                        .requestMatchers(HttpMethod.POST, "/api/master-data/entities").hasAnyAuthority("CREATE_PARTNER")
                        .requestMatchers(HttpMethod.PUT, "/api/master-data/entities/**").hasAnyAuthority("EDIT_PARTNER")
                        .requestMatchers(HttpMethod.DELETE, "/api/master-data/entities/**").hasAnyAuthority("EDIT_PARTNER")
                        .requestMatchers(HttpMethod.GET, "/api/master-data/entity-groups/**").hasAnyAuthority("VIEW_PARTNER")
                        .requestMatchers(HttpMethod.POST, "/api/master-data/entity-groups").hasAnyAuthority("CREATE_PARTNER")
                        .requestMatchers(HttpMethod.PUT, "/api/master-data/entity-groups/**").hasAnyAuthority("EDIT_PARTNER")
                        .requestMatchers(HttpMethod.DELETE, "/api/master-data/entity-groups/**").hasAnyAuthority("EDIT_PARTNER")
                        .requestMatchers(HttpMethod.GET, "api/vouchers/**").hasAnyAuthority("VIEW_VOUCHER")
                        .requestMatchers(HttpMethod.POST, "/api/vouchers/**").hasAnyAuthority("CREATE_VOUCHER")
                        .requestMatchers(HttpMethod.PUT, "/api/vouchers/**").hasAnyAuthority("EDIT_VOUCHER")
                        .requestMatchers(HttpMethod.DELETE, "/api/vouchers/**").hasAnyAuthority("EDIT_VOUCHER")
                        .requestMatchers(HttpMethod.GET, "/api/dashboard").hasAnyAuthority("VIEW_ACCOUNT_LEDGER", "VIEW_TRIAL_BALANCE")
                        .requestMatchers(HttpMethod.GET, "/api/users").hasAnyAuthority("VIEW_USER")
                        .requestMatchers(HttpMethod.POST, "/api/users").hasAnyAuthority("CREATE_USER")
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

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // ✅ Cho phép frontend gọi API
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // ✅ Quan trọng nếu bạn dùng cookies/auth

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}