package com.vacom.accounting_system.config;

import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;

/**
 * Utility class for handling JWT (JSON Web Token) operations using Nimbus JOSE+JWT.
 */
@Component
@Slf4j
public class JwtUtil implements InitializingBean {

    // Secret key should be injected from environment variables or application.properties
    private String signerKey;

    @Override
    public void afterPropertiesSet() throws IllegalArgumentException {
        // Default value if not set in environment/application.properties
        signerKey = System.getenv("JWT_SIGNER_KEY");
        if (signerKey == null || signerKey.trim().isEmpty()) {
            signerKey = "7zpPG8ax5inzAXINSRIjJqA1tCp7UlznKt6XETxKB5Vy48+U8m2sTfvBmZvqdkOq";
            log.warn("Using default signer key. This should be replaced with a secure key from environment variables.");
        }
    }

    /**
     * Extracts the username (subject) from the JWT token.
     *
     * @param token The JWT token as a String.
     * @return The username (subject) from the token, or null if extraction fails.
     */
    public String extractUsername(String token) {
        if (token == null || token.trim().isEmpty()) {
            log.warn("Token is null or empty");
            return null;
        }

        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            return claims.getSubject();
        } catch (ParseException e) {
            log.error("Cannot extract username from token: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Validates a JWT token against the user details, checking username match and expiration.
     *
     * @param token       The JWT token as a String.
     * @param userDetails The user details from Spring Security.
     * @return True if the token is valid, false otherwise.
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        if (token == null || token.trim().isEmpty() || userDetails == null) {
            log.warn("Token or userDetails is null/empty");
            return false;
        }

        try {
            String username = extractUsername(token);
            if (username == null || !username.equals(userDetails.getUsername())) {
                log.warn("Token username {} does not match user details username {}", username, userDetails.getUsername());
                return false;
            }

            if (isTokenExpired(token)) {
                log.warn("Token for user {} has expired", username);
                return false;
            }

            return true;
        } catch (Exception e) {
            log.error("Error validating token: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Validates a JWT token for basic validity (signature and expiration) without user details.
     *
     * @param token The JWT token as a String.
     * @return True if the token is valid (not expired and has a valid signature), false otherwise.
     */
    public boolean validateToken(String token) {
        if (token == null || token.trim().isEmpty()) {
            log.warn("Token is null or empty");
            return false;
        }

        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            // Kiểm tra chữ ký (MAC signer với SIGNER_KEY)
            signedJWT.verify(new com.nimbusds.jose.crypto.MACVerifier(signerKey.getBytes()));
            return !isTokenExpired(token);
        } catch (Exception e) {
            log.error("Invalid token: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Checks if the JWT token has expired.
     *
     * @param token The JWT token as a String.
     * @return True if the token is expired, false otherwise.
     */
    private boolean isTokenExpired(String token) {
        if (token == null || token.trim().isEmpty()) {
            log.warn("Token is null or empty");
            return true;
        }

        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            Date expiration = claims.getExpirationTime();
            if (expiration == null) {
                log.warn("Token has no expiration time");
                return true;
            }
            return expiration.before(new Date());
        } catch (ParseException e) {
            log.error("Cannot check token expiration: {}", e.getMessage());
            return true;
        }
    }

    public String getSignerKey() {
        return signerKey;
    }
}