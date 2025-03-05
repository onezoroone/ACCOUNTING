package com.example.accounting.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "vouchers")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "voucher_number", unique = true, nullable = false)
    private String voucherNumber;

    @Column(name = "voucher_type", nullable = false)
    private String voucherType;

    @Temporal(TemporalType.DATE)
    @Column(name = "voucher_date", nullable = false)
    private Date voucherDate;

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
    private Boolean printed;

    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VoucherDetail> voucherDetails;

    // Getters và Setters
}
