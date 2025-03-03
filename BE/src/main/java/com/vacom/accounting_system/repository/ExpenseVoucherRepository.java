package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.model.ExpenseVoucherModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ExpenseVoucherRepository extends JpaRepository<ExpenseVoucherModel, Integer>, JpaSpecificationExecutor<ExpenseVoucherModel> {
    Optional<ExpenseVoucherModel> findByVoucherNumber(String voucherNumber);
}
