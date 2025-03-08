package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.AccountLedgerReportDTO;
import com.vacom.accounting_system.entity.VoucherDetail;
import com.vacom.accounting_system.service.AccountLedgerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reports/account-ledger")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Báo cáo sổ chi tiết tài khoản", description = "API báo cáo sổ chi tiết tài khoản")
public class AccountLedgerController {

    private final AccountLedgerService accountLedgerService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('VIEW_ACCOUNT_LEDGER')")
    public ResponseEntity<Page<AccountLedgerReportDTO>> getAccountLedgerReport(
            @RequestParam(required = false) List<String> accountCodes,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(required = false) String voucherNumberContains,
            @RequestParam(required = false) String descriptionContains,
            @RequestParam(required = false, name = "oppositeAccount") List<String> oppositeAccounts,
            @PageableDefault(page = 0, size = 20, sort = {"voucherDate", "voucherNumber"}, direction = Sort.Direction.ASC) Pageable pageable) {

        // If accountCode is null or empty, fetch all account codes
        if (accountCodes == null || accountCodes.isEmpty()) {
            accountCodes = accountLedgerService.getAllAccountCodes();
        }

        Page<AccountLedgerReportDTO> report = accountLedgerService.getAccountLedgerReport(
                accountCodes, startDate, endDate, voucherNumberContains, descriptionContains, oppositeAccounts, pageable);
        return ResponseEntity.ok(report);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('CREATE_VOUCHER')")
    public ResponseEntity<VoucherDetail> createVoucherDetail(@RequestBody VoucherDetail voucherDetail) {
        VoucherDetail savedDetail = accountLedgerService.createVoucherDetail(voucherDetail);
        return ResponseEntity.status(201).body(savedDetail);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_VOUCHER')")
    public ResponseEntity<VoucherDetail> updateVoucherDetail(
            @PathVariable Integer id,
            @RequestBody VoucherDetail voucherDetail) {
        VoucherDetail updatedDetail = accountLedgerService.updateVoucherDetail(id, voucherDetail);
        return ResponseEntity.ok(updatedDetail);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_VOUCHER')")
    public ResponseEntity<Void> deleteVoucherDetail(@PathVariable Integer id) {
        accountLedgerService.deleteVoucherDetail(id);
        return ResponseEntity.noContent().build();
    }
}