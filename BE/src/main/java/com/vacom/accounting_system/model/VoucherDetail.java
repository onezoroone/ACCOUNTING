package com.example.accounting.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "voucher_details")
public class VoucherDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "voucher_id", nullable = false)
    private Voucher voucher;

    @Column(name = "account_debit", nullable = false)
    private Integer accountDebit;

    @Column(name = "account_credit", nullable = false)
    private Integer accountCredit;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "description")
    private String description;

    // Getters và Setters
}
