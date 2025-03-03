package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.AccountLedgerReportDTO;
import com.vacom.accounting_system.entity.VoucherDetail;
import com.vacom.accounting_system.service.AccountLedgerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/account-ledger")
@RequiredArgsConstructor
public class AccountLedgerController {

    private final AccountLedgerService accountLedgerService;

    @GetMapping("/report")
    public ResponseEntity<Page<AccountLedgerReportDTO>> getAccountLedgerReport(
            @RequestParam List<String> accountCode,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(required = false) String voucherNumberContains,
            @RequestParam(required = false) String descriptionContains,
            @RequestParam(required = false, name = "oppositeAccount") List<String> oppositeAccounts,
            @PageableDefault(page = 0, size = 20, sort = {"voucherDate", "voucherNumber"}, direction = Sort.Direction.ASC) Pageable pageable) {
        Page<AccountLedgerReportDTO> report = accountLedgerService.getAccountLedgerReport(
                accountCode, startDate, endDate, voucherNumberContains, descriptionContains, oppositeAccounts, pageable);
        return ResponseEntity.ok(report);
    }

    @PostMapping
    public ResponseEntity<VoucherDetail> createVoucherDetail(@RequestBody VoucherDetail voucherDetail) {
        VoucherDetail savedDetail = accountLedgerService.createVoucherDetail(voucherDetail);
        return ResponseEntity.status(201).body(savedDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VoucherDetail> updateVoucherDetail(
            @PathVariable Integer id,
            @RequestBody VoucherDetail voucherDetail) {
        VoucherDetail updatedDetail = accountLedgerService.updateVoucherDetail(id, voucherDetail);
        return ResponseEntity.ok(updatedDetail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoucherDetail(@PathVariable Integer id) {
        accountLedgerService.deleteVoucherDetail(id);
        return ResponseEntity.noContent().build();
    }
}