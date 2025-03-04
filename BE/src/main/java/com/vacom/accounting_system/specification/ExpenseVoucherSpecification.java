package com.vacom.accounting_system.specification;

import com.vacom.accounting_system.model.ExpenseVoucherModel;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class ExpenseVoucherSpecification {

    public static Specification<ExpenseVoucherModel> hasVoucherNumber(String voucherNumber) {
        return (root, query, cb) -> cb.equal(root.get("voucherNumber"), voucherNumber);
    }

    public static Specification<ExpenseVoucherModel> voucherDateAfter(LocalDate startDate) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("voucherDate"), startDate);
    }

    public static Specification<ExpenseVoucherModel> voucherDateBefore(LocalDate endDate) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("voucherDate"), endDate);
    }

    public static Specification<ExpenseVoucherModel> hasEntityCode(String entityCode) {
        return (root, query, cb) -> cb.equal(root.get("entityCode"), entityCode);
    }
}
