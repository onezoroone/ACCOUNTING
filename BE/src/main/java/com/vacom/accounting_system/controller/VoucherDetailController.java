package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.response.ApiResponse;
import com.vacom.accounting_system.dto.response.VoucherDetailResponseDTO;
import com.vacom.accounting_system.service.AccountLedgerService;
import com.vacom.accounting_system.service.VoucherDetailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Chi tiết chứng từ", description = "API quản lý chi tiết chứng từ")
public class VoucherDetailController {

    private final VoucherDetailService voucherDetailService;

    @DeleteMapping("/{detailId}")
    public ResponseEntity<ApiResponse<Void>> deleteVoucherDetail(
            @PathVariable Integer detailId
    ) {
        voucherDetailService.deleteVoucherDetail(detailId);
        ApiResponse<Void> apiResponse = new ApiResponse<>(
                HttpStatus.OK.value(),
                new Date(),
                "Xóa chi tiết phiếu thành công",
                null
        );
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("/{detailId}")
    public ResponseEntity<ApiResponse<VoucherDetailResponseDTO>> updateVoucherDetail(
            @PathVariable Integer detailId,
            @Valid @RequestBody VoucherDetailResponseDTO voucherDetailResponseDTO
    ) {
        VoucherDetailResponseDTO voucherDetailResponseDT0 = voucherDetailService.updateVoucherDetail(detailId, voucherDetailResponseDTO);
        ApiResponse<VoucherDetailResponseDTO> apiResponse = new ApiResponse<>(
                HttpStatus.OK.value(),
                new Date(),
                "Cập nhật chi tiết phiếu thành công",
                voucherDetailResponseDT0
        );
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
