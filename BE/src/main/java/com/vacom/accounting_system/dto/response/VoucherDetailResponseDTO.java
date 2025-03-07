package com.vacom.accounting_system.dto.response;

import lombok.Data;

@Data
public class VoucherDetailResponseDTO {
    private String accountDebitCode;
    private String accountCreditCode;
    private Double amount;
    private String currentCode;
    private Double exchangeRate;
    private Double totalAmount;
    private Double totalAmountOrigin;
}
