package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.model.ExpenseVoucherModel;
import com.vacom.accounting_system.service.ExpenseVoucherService;
import com.vacom.accounting_system.specification.ExpenseVoucherSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/api/expense-vouchers")
public class ExpenseVoucherController {

    @Autowired
    private ExpenseVoucherService expenseVoucherService;

    @PostMapping
    public ResponseEntity<ExpenseVoucherModel> createExpenseVoucher(@RequestBody ExpenseVoucherModel voucher) {
        ExpenseVoucherModel savedVoucher = expenseVoucherService.createExpenseVoucher(voucher);
        return ResponseEntity.ok(savedVoucher);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseVoucherModel> getExpenseVoucherById(@PathVariable Integer id) {
        return expenseVoucherService.getExpenseVoucherById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseVoucherModel> updateExpenseVoucher(@PathVariable Integer id, @RequestBody ExpenseVoucherModel voucher) {
        if (!expenseVoucherService.getExpenseVoucherById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        voucher.setId(id);
        return ResponseEntity.ok(expenseVoucherService.updateExpenseVoucher(voucher));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpenseVoucher(@PathVariable Integer id) {
        expenseVoucherService.deleteExpenseVoucher(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint tìm kiếm và lọc phiếu chi
    @GetMapping
    public ResponseEntity<Page<ExpenseVoucherModel>> searchExpenseVouchers(
            @RequestParam(required = false) String voucherNumber,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String entityCode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Specification<ExpenseVoucherModel> spec = Specification.where(null);

        if (voucherNumber != null && !voucherNumber.isEmpty()) {
            spec = spec.and(ExpenseVoucherSpecification.hasVoucherNumber(voucherNumber));
        }
        if (startDate != null && !startDate.isEmpty()) {
            try {
                LocalDate start = LocalDate.parse(startDate);
                spec = spec.and(ExpenseVoucherSpecification.voucherDateAfter(start));
            } catch (DateTimeParseException e) {
                // Xử lý lỗi định dạng ngày
            }
        }
        if (endDate != null && !endDate.isEmpty()) {
            try {
                LocalDate end = LocalDate.parse(endDate);
                spec = spec.and(ExpenseVoucherSpecification.voucherDateBefore(end));
            } catch (DateTimeParseException e) {
                // Xử lý lỗi định dạng ngày
            }
        }
        if (entityCode != null && !entityCode.isEmpty()) {
            spec = spec.and(ExpenseVoucherSpecification.hasEntityCode(entityCode));
        }

        Page<ExpenseVoucherModel> result = expenseVoucherService.searchExpenseVouchers(spec, pageable);
        return ResponseEntity.ok(result);
    }
}
