package com.vacom.accounting_system.dto;

import lombok.Data;

import java.util.Date;

@Data
public class AccountLedgerReportDTO {
    private Date date;
    private String voucherNumber;
    private String description;
    private String oppositeAccount;
    private Double debitAmount;
    private Double creditAmount;
    private Double debitBalance;
    private Double creditBalance;
}