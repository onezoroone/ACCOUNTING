package com.vacom.accounting_system.exception;

import lombok.*;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class ValidationErrorResponse extends ErrorResponse {
    private Map<String, String> validationErrors;

    public ValidationErrorResponse(int status, Date timestamp, String message, Map<String, String> validationErrors) {
        super(status, timestamp, message, "Lỗi xác thực dữ liệu");
        this.validationErrors = validationErrors;
    }
}
