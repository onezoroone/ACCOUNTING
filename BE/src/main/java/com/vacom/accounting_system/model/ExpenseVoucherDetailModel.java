package com.vacom.accounting_system.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "voucher_details")
public class ExpenseVoucherDetailModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "voucher_id", nullable = false)
    private ExpenseVoucherModel expenseVoucher;  // Liên kết với ExpenseVoucherModel

    @Column(nullable = false)
    private Integer accountDebit;

    @Column(nullable = false)
    private Integer accountCredit;

    @Column(nullable = false)
    private BigDecimal amount;

    private String description;
}
package com.vacom.accounting_system.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "voucher_details")
public class ExpenseVoucherDetailModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "voucher_id", nullable = false)
    private ExpenseVoucherModel expenseVoucher;  // Liên kết với ExpenseVoucherModel

    @Column(nullable = false)
    private Integer accountDebit;

    @Column(nullable = false)
    private Integer accountCredit;

    @Column(nullable = false)
    private BigDecimal amount;

    private String description;
}
