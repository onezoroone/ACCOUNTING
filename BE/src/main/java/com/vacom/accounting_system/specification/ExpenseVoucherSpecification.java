package com.vacom.accounting_system.specification;

import com.vacom.accounting_system.model.ExpenseVoucherModel;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class ExpenseVoucherSpecification {

    public static Specification<ExpenseVoucherModel> hasVoucherNumber(String voucherNumber) {
        return (root, query, cb) -> cb.equal(root.get("voucherNumber"), voucherNumber);
    }

    public static Specification<ExpenseVoucherModel> voucherDateAfter(LocalDate date) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("voucherDate"), date);
    }

    public static Specification<ExpenseVoucherModel> voucherDateBefore(LocalDate date) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("voucherDate"), date);
    }

    public static Specification<ExpenseVoucherModel> hasPaidTo(String paidTo) {
        return (root, query, cb) -> cb.equal(root.get("paidTo"), paidTo);
    }

    public static Specification<ExpenseVoucherModel> hasPaymentMethod(String paymentMethod) {
        return (root, query, cb) -> cb.equal(root.get("paymentMethod"), paymentMethod);
    }
}
