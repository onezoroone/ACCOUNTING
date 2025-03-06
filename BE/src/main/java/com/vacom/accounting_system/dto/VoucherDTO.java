package com.vacom.accounting_system.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.Date;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class VoucherDTO {
    @NotBlank(message = "Entity code is required")
    private String entityCode;

    private String entityName;

    @NotNull(message = "Voucher date is required")
    private Date voucherDate;

    private String address;

    @NotBlank(message = "Voucher number is required")
    private String voucherNumber;

    private String description;

    @NotBlank(message = "Currency code is required")
    private String currencyCode;

    private Double exchangeRate;

    @NotEmpty(message = "At least one voucher detail is required")
    private List<VoucherDetailDTO> details;
}