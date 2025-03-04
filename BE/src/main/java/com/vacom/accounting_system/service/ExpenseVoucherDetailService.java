package com.vacom.accounting_system.service;

import com.vacom.accounting_system.model.ExpenseVoucherDetailModel;
import com.vacom.accounting_system.repository.ExpenseVoucherDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseVoucherDetailService {

    @Autowired
    private ExpenseVoucherDetailRepository expenseVoucherDetailRepository;

    public ExpenseVoucherDetailModel createExpenseVoucherDetail(ExpenseVoucherDetailModel detail) {
        return expenseVoucherDetailRepository.save(detail);
    }

    public Optional<ExpenseVoucherDetailModel> getExpenseVoucherDetailById(Integer id) {
        return expenseVoucherDetailRepository.findById(id);
    }

    public ExpenseVoucherDetailModel updateExpenseVoucherDetail(ExpenseVoucherDetailModel detail) {
        return expenseVoucherDetailRepository.save(detail);
    }

    public void deleteExpenseVoucherDetail(Integer id) {
        expenseVoucherDetailRepository.deleteById(id);
    }

    public List<ExpenseVoucherDetailModel> getDetailsByVoucherId(Integer voucherId) {
        return expenseVoucherDetailRepository.findAll((root, query, cb) -> cb.equal(root.get("expenseVoucher").get("id"), voucherId));
    }

    public Page<ExpenseVoucherDetailModel> searchExpenseVoucherDetails(Specification<ExpenseVoucherDetailModel> spec, Pageable pageable) {
        return expenseVoucherDetailRepository.findAll(spec, pageable);
    }
}
