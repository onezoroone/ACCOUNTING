package com.vacom.accounting_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "vouchers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "voucher_number", nullable = false, unique = true)
    private String voucherNumber;

    @Column(name = "voucher_type", nullable = false)
    private String voucherType;

    @Column(name = "voucher_date", nullable = false)
    private Date voucherDate;

    @Column(name = "description")
    private String description;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "currency_id", nullable = false)
    private Integer currencyId;

    @Column(name = "exchange_rate", nullable = false)
    private Double exchangeRate;

    @Column(name = "total_amount_origin", nullable = false)
    private Double totalAmountOrigin;

    @Column(name = "entity_code")
    private String entityCode;

    @Column(name = "created_by", nullable = false)
    private Integer createdBy;

    @Column(name = "printed", nullable = false)
    private Boolean printed;

    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VoucherDetail> details;
}
