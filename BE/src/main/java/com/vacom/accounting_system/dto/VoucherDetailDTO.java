package com.vacom.accounting_system.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class VoucherDetailDTO {
    @NotBlank(message = "Debit account code is required")
    private String accountDebitCode;

    @NotBlank(message = "Credit account code is required")
    private String accountCreditCode;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;
}