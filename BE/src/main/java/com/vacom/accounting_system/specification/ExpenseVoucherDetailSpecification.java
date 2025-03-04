package com.vacom.accounting_system.specification;

import com.vacom.accounting_system.model.ExpenseVoucherDetailModel;
import org.springframework.data.jpa.domain.Specification;

public class ExpenseVoucherDetailSpecification {

    public static Specification<ExpenseVoucherDetailModel> hasAccountDebit(Integer accountDebit) {
        return (root, query, cb) -> cb.equal(root.get("accountDebit"), accountDebit);
    }

    public static Specification<ExpenseVoucherDetailModel> hasAccountCredit(Integer accountCredit) {
        return (root, query, cb) -> cb.equal(root.get("accountCredit"), accountCredit);
    }
}
