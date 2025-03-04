package com.vacom.accounting_system.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private boolean authenticated;
    private String username;
    private String message;
    private String errorMessage;
}
