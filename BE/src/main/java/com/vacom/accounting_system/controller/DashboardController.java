package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.DashboardDTO;
import com.vacom.accounting_system.service.DashboardService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Tag(name = "Trang chủ", description = "API trang chủ")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
//    @PreAuthorize("hasAnyAuthority('VIEW_ACCOUNT_LEDGER', 'VIEW_TRIAL_BALANCE')")
    public ResponseEntity<DashboardDTO> getDashboardData() {
        return ResponseEntity.ok(dashboardService.getDashboardData());
    }
}