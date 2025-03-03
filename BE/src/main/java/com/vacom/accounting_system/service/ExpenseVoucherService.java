package com.vacom.accounting_system.service;

import com.vacom.accounting_system.model.ExpenseVoucherModel;
import com.vacom.accounting_system.repository.ExpenseVoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ExpenseVoucherService {

    @Autowired
    private ExpenseVoucherRepository expenseVoucherRepository;

    // Tạo mới phiếu chi
    public ExpenseVoucherModel createExpenseVoucher(ExpenseVoucherModel voucher) {
        return expenseVoucherRepository.save(voucher);
    }

    // Lấy phiếu chi theo id
    public Optional<ExpenseVoucherModel> getExpenseVoucherById(Integer id) {
        return expenseVoucherRepository.findById(id);
    }

    // Cập nhật phiếu chi
    public ExpenseVoucherModel updateExpenseVoucher(ExpenseVoucherModel voucher) {
        return expenseVoucherRepository.save(voucher);
    }

    // Xóa phiếu chi
    public void deleteExpenseVoucher(Integer id) {
        expenseVoucherRepository.deleteById(id);
    }

    // Tìm kiếm, filter và phân trang phiếu chi
    public Page<ExpenseVoucherModel> searchExpenseVouchers(Specification<ExpenseVoucherModel> spec, Pageable pageable) {
        return expenseVoucherRepository.findAll(spec, pageable);
    }
}
