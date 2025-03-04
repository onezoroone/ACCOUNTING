package com.vacom.accounting_system.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "vouchers")
@Getter
@Setter
public class ExpenseVoucherModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "voucher_number", nullable = false, unique = true)
    private String voucherNumber;

    @Column(name = "voucher_type", nullable = false)
    private String voucherType;

    @Column(name = "voucher_date", nullable = false)
    private LocalDate voucherDate;

    @Column(name = "description")
    private String description;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "currency_id", nullable = false)
    private Integer currencyId;

    @Column(name = "exchange_rate", nullable = false)
    private BigDecimal exchangeRate;

    @Column(name = "total_amount_origin", nullable = false)
    private BigDecimal totalAmountOrigin;

    @Column(name = "entity_code")
    private String entityCode;

    @Column(name = "created_by", nullable = false)
    private Integer createdBy;

    @Column(name = "printed", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean printed = false;

    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExpenseVoucherDetailModel> details;
}
