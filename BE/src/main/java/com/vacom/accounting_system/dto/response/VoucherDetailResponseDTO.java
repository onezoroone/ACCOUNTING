package com.vacom.accounting_system.dto.response;

import lombok.Data;

@Data
public class VoucherDetailResponseDTO {
    private String accountDebitCode;
    private String accountCreditCode;
    private Double amount;
}
