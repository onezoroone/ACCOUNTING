package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.VoucherDTO;
import com.vacom.accounting_system.dto.response.ApiResponse;
import com.vacom.accounting_system.dto.response.VoucherResponseDTO;
import com.vacom.accounting_system.service.VoucherService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/vouchers")
@Tag(name = "Chứng từ", description = "API quản lý chứng từ")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('VIEW_VOUCHER')")
    public ResponseEntity<Page<VoucherResponseDTO>> getAllVouchers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "voucherDate") String sortField,
            @RequestParam(required = false, defaultValue = "desc") String sortDirection
    ) {
        Sort sort = sortDirection.equalsIgnoreCase("asc") ?
                Sort.by(sortField).ascending() :
                Sort.by(sortField).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<VoucherResponseDTO> vouchers = voucherService.getAllVouchers(pageable);
        return ResponseEntity.ok(vouchers);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('EDIT_VOUCHER')")
    public ResponseEntity<ApiResponse<VoucherResponseDTO>> createVoucher(
            @Valid @RequestBody VoucherDTO dto
    ) {
        VoucherResponseDTO response = voucherService.createVoucher(dto);
        ApiResponse<VoucherResponseDTO> apiResponse = new ApiResponse<>(
                HttpStatus.CREATED.value(),
                new Date(),
                "Tạo phiếu thành công",
                response
        );
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @DeleteMapping("/{voucherId}")
    @PreAuthorize("hasAnyAuthority('EDIT_VOUCHER')")
    public ResponseEntity<ApiResponse<Void>> deleteVoucher(
            @PathVariable Integer voucherId
    ) {
        voucherService.deleteVoucher(voucherId);
        ApiResponse<Void> apiResponse = new ApiResponse<>(
                HttpStatus.OK.value(),
                new Date(),
                "Xóa phiếu thành công",
                null
        );
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}