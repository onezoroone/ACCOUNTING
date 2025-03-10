package com.vacom.accounting_system.dto.response;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class VoucherResponseDTO {
    private Integer Id;
    private String voucherNumber;
    private Date voucherDate;
    private String voucherType;
    private String entityCode;
    private String entityName;
    private String address;
    private String createBy;
    private String currentCode;
    private Double totalAmount;
    private Double totalAmountOrigin;
    private Integer currencyId;
    private Double exchangeRate;
    private String description;
    private List<VoucherDetailResponseDTO> details;
}