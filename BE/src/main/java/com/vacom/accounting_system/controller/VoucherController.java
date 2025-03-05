package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.mapper.VoucherMapper;
import com.vacom.accounting_system.model.VoucherModel;
import com.vacom.accounting_system.entity.Voucher;
import com.vacom.accounting_system.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private VoucherMapper voucherMapper; // Inject Mapper

    @GetMapping
    public ResponseEntity<List<VoucherModel>> getAllVouchers() {
        List<Voucher> vouchers = voucherService.getAllVouchers();
        List<VoucherModel> voucherModels = vouchers.stream()
                .map(voucherMapper::toModel)
                .collect(Collectors.toList());
        return ResponseEntity.ok(voucherModels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VoucherModel> getVoucherById(@PathVariable Integer id) {
        Optional<Voucher> voucher = voucherService.getVoucherById(id);
        return voucher.map(v -> ResponseEntity.ok(voucherMapper.toModel(v)))
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<VoucherModel> createVoucher(@RequestBody VoucherModel voucherModel) {
        Voucher voucher = voucherMapper.toEntity(voucherModel);
        Voucher savedVoucher = voucherService.createVoucher(voucher);
        return ResponseEntity.ok(voucherMapper.toModel(savedVoucher));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VoucherModel> updateVoucher(@PathVariable Integer id, @RequestBody VoucherModel voucherModel) {
        if (!voucherService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Voucher updatedVoucher = voucherService.updateVoucher(id, voucherMapper.toEntity(voucherModel));
        return ResponseEntity.ok(voucherMapper.toModel(updatedVoucher));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoucher(@PathVariable Integer id) {
        if (!voucherService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        voucherService.deleteVoucher(id);
        return ResponseEntity.noContent().build();
    }
}
