package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.model.ExpenseVoucherDetailModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseVoucherDetailRepository extends JpaRepository<ExpenseVoucherDetailModel, Integer>, JpaSpecificationExecutor<ExpenseVoucherDetailModel> {
}
