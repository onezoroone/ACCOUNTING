package com.vacom.accounting_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private int status;
    private Date timestamp;
    private String message;
    private T data;
}