package com.vacom.accounting_system.service;

import com.vacom.accounting_system.entity.Voucher;
import com.vacom.accounting_system.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    public Optional<Voucher> getVoucherById(Integer id) {
        return voucherRepository.findById(id);
    }

    public Voucher createVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    public Voucher updateVoucher(Integer id, Voucher updatedVoucher) {
        return voucherRepository.findById(id).map(v -> {
            v.setVoucherNumber(updatedVoucher.getVoucherNumber());
            v.setVoucherType(updatedVoucher.getVoucherType());
            v.setVoucherDate(updatedVoucher.getVoucherDate());
            v.setDescription(updatedVoucher.getDescription());
            v.setTotalAmount(updatedVoucher.getTotalAmount());
            v.setCurrencyId(updatedVoucher.getCurrencyId());
            v.setExchangeRate(updatedVoucher.getExchangeRate());
            v.setTotalAmountOrigin(updatedVoucher.getTotalAmountOrigin());
            v.setEntityCode(updatedVoucher.getEntityCode());
            v.setCreatedBy(updatedVoucher.getCreatedBy());
            v.setPrinted(updatedVoucher.getPrinted());
            return voucherRepository.save(v);
        }).orElse(null);
    }

    public void deleteVoucher(Integer id) {
        voucherRepository.deleteById(id);
    }
}
