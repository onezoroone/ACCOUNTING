package com.vacom.accounting_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
    private Double totalCash;
    private Double totalBankDeposit;
    private Double totalReceivable;
    private Double totalPayable;
    private List<MonthlyTransactionDTO> monthlyTransactions;
    private List<YearlyRevenueDTO> yearlyRevenue;
}

