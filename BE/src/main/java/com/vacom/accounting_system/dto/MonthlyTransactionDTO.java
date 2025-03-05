package com.vacom.accounting_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyTransactionDTO {
    private String month;
    private Double income;
    private Double expense;
}
