package com.vacom.accounting_system.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginRequest {
    @NotBlank(message = "Username is required")
    String username;

    @NotBlank(message = "Password is required")
    String password;
}
