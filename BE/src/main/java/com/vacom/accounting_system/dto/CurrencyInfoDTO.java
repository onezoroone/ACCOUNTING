package com.vacom.accounting_system.dto;

import lombok.Data;

@Data
public class CurrencyInfoDTO {
    private String currencyCode;
    private String currencyName;
    private Double exchangeRate;
}