package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.model.ExpenseVoucherModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseVoucherRepository extends JpaRepository<ExpenseVoucherModel, Integer>, JpaSpecificationExecutor<ExpenseVoucherModel> {
}
