package com.vacom.accounting_system.dto;

import lombok.Data;

@Data
public class CurrencyInfoDTO {
    private String currencyName;
    private Double exchangeRate;
}