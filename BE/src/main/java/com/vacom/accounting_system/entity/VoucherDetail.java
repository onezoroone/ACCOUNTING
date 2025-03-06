package com.vacom.accounting_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "voucher_details")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoucherDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "voucher_id", nullable = false)
    private Voucher voucher;

    @ManyToOne
    @JoinColumn(name = "account_debit", referencedColumnName = "id", nullable = false)
    private Account accountDebit;

    @ManyToOne
    @JoinColumn(name = "account_credit", referencedColumnName = "id", nullable = false)
    private Account accountCredit;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "description")
    private String description;
}