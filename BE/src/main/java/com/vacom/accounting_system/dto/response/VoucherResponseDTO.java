package com.vacom.accounting_system.dto.response;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class VoucherResponseDTO {
    private Integer Id;
    private String voucherNumber;
    private Date voucherDate;
    private String entityCode;
    private String entityName;
    private String currencyCode;
    private Double totalAmount;
    private List<VoucherDetailResponseDTO> details;
}