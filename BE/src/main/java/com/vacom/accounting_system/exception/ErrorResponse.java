package com.vacom.accounting_system.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private Date timestamp;
    private String message;
    private String details;
}