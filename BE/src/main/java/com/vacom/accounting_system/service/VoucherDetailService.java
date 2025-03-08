package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.response.VoucherDetailResponseDTO;
import com.vacom.accounting_system.entity.Account;
import com.vacom.accounting_system.entity.Voucher;
import com.vacom.accounting_system.entity.VoucherDetail;
import com.vacom.accounting_system.exception.ResourceNotFoundException;
import com.vacom.accounting_system.repository.AccountRepository;
import com.vacom.accounting_system.repository.VoucherDetailRepository;
import com.vacom.accounting_system.repository.VoucherRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VoucherDetailService {

    private VoucherDetailRepository voucherDetailRepository;
    private VoucherRepository voucherRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public void deleteVoucherDetail(Integer detailId) {
        VoucherDetail detail = voucherDetailRepository.findById(detailId)
                .orElseThrow(() -> new ResourceNotFoundException("Chi tiết phiếu", "ID", detailId.toString()));

        Integer voucherId = detail.getVoucher().getId();

        // Delete the detail
        voucherDetailRepository.deleteById(detailId);

        // Recalculate voucher totals
        recalculateVoucherTotal(voucherId);
    }

    @Transactional
    public VoucherDetailResponseDTO updateVoucherDetail(Integer voucherDetailId, VoucherDetailResponseDTO voucherDetailResponseDTO) {
        VoucherDetail detail = voucherDetailRepository.findById(voucherDetailId)
                .orElseThrow(() -> new ResourceNotFoundException("Chi tiết phiếu", "ID", voucherDetailId.toString()));

        Account accountDebit = accountRepository.findByAccountCode(voucherDetailResponseDTO.getAccountDebitCode())
                .orElseThrow(() -> new ResourceNotFoundException("Tài khoản nợ", "mã tài khoản",
                        voucherDetailResponseDTO.getAccountDebitCode()));

        Account accountCredit = accountRepository.findByAccountCode(voucherDetailResponseDTO.getAccountCreditCode())
                .orElseThrow(() -> new ResourceNotFoundException("Tài khoản có", "mã tài khoản",
                        voucherDetailResponseDTO.getAccountCreditCode()));

        detail.setAccountDebit(accountDebit);
        detail.setAccountCredit(accountCredit);
        detail.setAmount(voucherDetailResponseDTO.getAmount());
        detail.setDescription(voucherDetailResponseDTO.getDescription());

        VoucherDetail savedDetail = voucherDetailRepository.save(detail);

        recalculateVoucherTotal(detail.getVoucher().getId());

        return convertToDTO(savedDetail);
    }

    @Transactional
    public void recalculateVoucherTotal(Integer voucherId) {
        Voucher voucher = voucherRepository.findById(voucherId)
                .orElseThrow(() -> new ResourceNotFoundException("Phiếu", "ID", voucherId.toString()));

        List<VoucherDetail> details = voucherDetailRepository.findByVoucherId(voucherId);

        // Calculate total from details
        double totalAmountOrigin = details.stream()
                .mapToDouble(VoucherDetail::getAmount)
                .sum();

        // Calculate converted amount
        double totalAmount = totalAmountOrigin * voucher.getExchangeRate();

        // Update voucher
        voucher.setTotalAmountOrigin(totalAmountOrigin);
        voucher.setTotalAmount(totalAmount);

        voucherRepository.save(voucher);
    }

    private VoucherDetailResponseDTO convertToDTO(VoucherDetail detail) {
        VoucherDetailResponseDTO dto = new VoucherDetailResponseDTO();
        dto.setId(detail.getId());
        dto.setAccountDebitCode(detail.getAccountDebit().getAccountCode());
        dto.setAccountCreditCode(detail.getAccountCredit().getAccountCode());
        dto.setAmount(detail.getAmount());
        return dto;
    }
}
