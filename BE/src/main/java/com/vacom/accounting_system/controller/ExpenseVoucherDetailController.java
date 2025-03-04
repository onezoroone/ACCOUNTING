package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.model.ExpenseVoucherDetailModel;
import com.vacom.accounting_system.service.ExpenseVoucherDetailService;
import com.vacom.accounting_system.specification.ExpenseVoucherDetailSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense-voucher-details")
public class ExpenseVoucherDetailController {

    @Autowired
    private ExpenseVoucherDetailService expenseVoucherDetailService;

    @PostMapping
    public ResponseEntity<ExpenseVoucherDetailModel> createExpenseVoucherDetail(@RequestBody ExpenseVoucherDetailModel detail) {
        ExpenseVoucherDetailModel savedDetail = expenseVoucherDetailService.createExpenseVoucherDetail(detail);
        return ResponseEntity.ok(savedDetail);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseVoucherDetailModel> getExpenseVoucherDetailById(@PathVariable Integer id) {
        return expenseVoucherDetailService.getExpenseVoucherDetailById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseVoucherDetailModel> updateExpenseVoucherDetail(@PathVariable Integer id, @RequestBody ExpenseVoucherDetailModel detail) {
        if (!expenseVoucherDetailService.getExpenseVoucherDetailById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        detail.setId(id);
        return ResponseEntity.ok(expenseVoucherDetailService.updateExpenseVoucherDetail(detail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpenseVoucherDetail(@PathVariable Integer id) {
        expenseVoucherDetailService.deleteExpenseVoucherDetail(id);
        return ResponseEntity.noContent().build();
    }

    // Lấy danh sách chi tiết theo `voucherId`
    @GetMapping("/by-voucher/{voucherId}")
    public ResponseEntity<List<ExpenseVoucherDetailModel>> getDetailsByVoucherId(@PathVariable Integer voucherId) {
        return ResponseEntity.ok(expenseVoucherDetailService.getDetailsByVoucherId(voucherId));
    }

    // Tìm kiếm chi tiết phiếu chi có điều kiện
    @GetMapping
    public ResponseEntity<Page<ExpenseVoucherDetailModel>> searchExpenseVoucherDetails(
            @RequestParam(required = false) Integer accountDebit,
            @RequestParam(required = false) Integer accountCredit,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Specification<ExpenseVoucherDetailModel> spec = Specification.where(null);

        if (accountDebit != null) {
            spec = spec.and(ExpenseVoucherDetailSpecification.hasAccountDebit(accountDebit));
        }
        if (accountCredit != null) {
            spec = spec.and(ExpenseVoucherDetailSpecification.hasAccountCredit(accountCredit));
        }

        Page<ExpenseVoucherDetailModel> result = expenseVoucherDetailService.searchExpenseVoucherDetails(spec, pageable);
        return ResponseEntity.ok(result);
    }
}
