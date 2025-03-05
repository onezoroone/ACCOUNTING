package com.vacom.accounting_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YearlyRevenueDTO {
    private Integer year;
    private Double totalRevenue;
}