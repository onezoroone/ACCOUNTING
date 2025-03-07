package com.vacom.accounting_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrialBalanceResponseDTO {
    private String accountCode;
    private String accountName;
    private Double debitOpening;
    private Double creditOpening;
    private Double debitTransaction;
    private Double creditTransaction;
    private Double debitClosing;
    private Double creditClosing;
}
