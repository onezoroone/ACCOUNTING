package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.TrialBalanceDTO;
import com.vacom.accounting_system.dto.response.TrialBalanceResponseDTO;
import com.vacom.accounting_system.service.TrialBalanceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reports/trial-balance")
@RequiredArgsConstructor
@Tag(name = "Báo cáo sổ cân đối phát sinh", description = "API quản lý báo cáo sổ cân đối phát sinh")
public class TrialBalanceController {

    private final TrialBalanceService trialBalanceService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('VIEW_TRIAL_BALANCE')")
    public ResponseEntity<Page<TrialBalanceResponseDTO>> getTrialBalance(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate){

        Pageable pageable = PageRequest.of(page, size);
        Page<TrialBalanceResponseDTO> trialBalance = trialBalanceService.getTrialBalance(pageable, startDate, endDate);
        return ResponseEntity.ok(trialBalance);
    }

    @GetMapping("/{accountCode}")
    @PreAuthorize("hasAnyAuthority('VIEW_TRIAL_BALANCE')")
    public ResponseEntity<TrialBalanceDTO> getTrialBalanceByAccountCode(
            @PathVariable String accountCode,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        TrialBalanceDTO trialBalance = trialBalanceService.getTrialBalanceByAccountCode(accountCode, startDate, endDate);
        return ResponseEntity.ok(trialBalance);
    }
}