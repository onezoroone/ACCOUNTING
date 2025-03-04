package com.vacom.accounting_system.service;

import com.vacom.accounting_system.model.ExpenseVoucherModel;
import com.vacom.accounting_system.repository.ExpenseVoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ExpenseVoucherService {

    @Autowired
    private ExpenseVoucherRepository expenseVoucherRepository;

    public ExpenseVoucherModel createExpenseVoucher(ExpenseVoucherModel voucher) {
        return expenseVoucherRepository.save(voucher);
    }

    public Optional<ExpenseVoucherModel> getExpenseVoucherById(Integer id) {
        return expenseVoucherRepository.findById(id);
    }

    public ExpenseVoucherModel updateExpenseVoucher(ExpenseVoucherModel voucher) {
        return expenseVoucherRepository.save(voucher);
    }

    public void deleteExpenseVoucher(Integer id) {
        expenseVoucherRepository.deleteById(id);
    }

    public Page<ExpenseVoucherModel> searchExpenseVouchers(Specification<ExpenseVoucherModel> spec, Pageable pageable) {
        return expenseVoucherRepository.findAll(spec, pageable);
    }
}
