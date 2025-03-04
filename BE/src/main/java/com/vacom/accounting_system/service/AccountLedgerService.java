package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.AccountLedgerReportDTO;
import com.vacom.accounting_system.entity.Account;
import com.vacom.accounting_system.entity.Voucher;
import com.vacom.accounting_system.entity.VoucherDetail;
import com.vacom.accounting_system.repository.AccountRepository;
import com.vacom.accounting_system.repository.VoucherDetailRepository;
import com.vacom.accounting_system.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountLedgerService {

    private final AccountRepository accountRepository;
    private final VoucherRepository voucherRepository;
    private final VoucherDetailRepository voucherDetailRepository;

    // Read: Lấy báo cáo sổ chi tiết tài khoản với lọc, phân trang, và sắp xếp cho nhiều accountCodes
    public Page<AccountLedgerReportDTO> getAccountLedgerReport(List<String> accountCodes, Date startDate, Date endDate,
                                                               String voucherNumberContains, String descriptionContains,
                                                               List<String> oppositeAccounts, Pageable pageable) {
        // Kiểm tra và validate accountCodes
        if (accountCodes == null || accountCodes.isEmpty()) {
            throw new IllegalArgumentException("At least one account code is required");
        }

        // Kiểm tra các accountCodes có hợp lệ không
        List<String> validAccountCodes = accountRepository.findAllByAccountCodeIn(accountCodes)
                .stream()
                .map(Account::getAccountCode)
                .collect(Collectors.toList());
        if (validAccountCodes.size() < accountCodes.size()) {
            throw new IllegalArgumentException("Some account codes are invalid: " + accountCodes);
        }

        List<AccountLedgerReportDTO> report = new ArrayList<>();
        Double debitBalance = 0.0;
        Double creditBalance = 0.0;

        // Xử lý từng accountCode trong danh sách
        for (String accountCode : accountCodes) {
            Page<Voucher> voucherPage = voucherRepository.findByVoucherDateBetween(startDate, endDate, pageable);

            for (Voucher voucher : voucherPage) {
                // Lọc theo số chứng từ (voucher_number) nếu có
                if (voucherNumberContains != null && !voucher.getVoucherNumber().toLowerCase().contains(voucherNumberContains.toLowerCase())) {
                    continue;
                }

                List<VoucherDetail> details = voucherDetailRepository.findByVoucherIdAndFilters(
                        voucher.getId(), descriptionContains, oppositeAccounts);

                for (VoucherDetail detail : details) {
                    boolean isDebit = detail.getAccountDebit().getAccountCode().equals(accountCode);
                    boolean isCredit = detail.getAccountCredit().getAccountCode().equals(accountCode);

                    if (isDebit || isCredit) {
                        String description = detail.getDescription() != null ? detail.getDescription() : voucher.getDescription();
                        String oppositeAccount = isDebit ? detail.getAccountCredit().getAccountCode() : detail.getAccountDebit().getAccountCode();

                        // Lọc theo diễn giải nếu có
                        if (descriptionContains != null && !description.toLowerCase().contains(descriptionContains.toLowerCase())) {
                            continue;
                        }

                        // Lọc theo tài khoản đối ứng nếu có
                        if (oppositeAccounts != null && !oppositeAccounts.isEmpty() && !oppositeAccounts.contains(oppositeAccount)) {
                            continue;
                        }

                        AccountLedgerReportDTO dto = new AccountLedgerReportDTO();
                        dto.setDate(voucher.getVoucherDate());
                        dto.setVoucherNumber(voucher.getVoucherNumber());
                        dto.setDescription(description);
                        dto.setOppositeAccount(oppositeAccount);

                        if (isDebit) {
                            dto.setDebitAmount(detail.getAmount());
                            dto.setCreditAmount(0.0);
                            debitBalance += detail.getAmount();
                        } else {
                            dto.setDebitAmount(0.0);
                            dto.setCreditAmount(detail.getAmount());
                            creditBalance += detail.getAmount();
                        }

                        dto.setDebitBalance(debitBalance);
                        dto.setCreditBalance(creditBalance);

                        report.add(dto);
                    }
                }
            }
        }

        // Tạo Page từ danh sách đã lọc
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), report.size());
        List<AccountLedgerReportDTO> pageContent = report.subList(start, end);

        return new PageImpl<>(pageContent, pageable, report.size());
    }

    // Create, Update, Delete giữ nguyên
    public VoucherDetail createVoucherDetail(VoucherDetail voucherDetail) {
        return voucherDetailRepository.save(voucherDetail);
    }

    public VoucherDetail updateVoucherDetail(Integer id, VoucherDetail voucherDetail) {
        voucherDetail.setId(id);
        return voucherDetailRepository.save(voucherDetail);
    }

    public void deleteVoucherDetail(Integer id) {
        voucherDetailRepository.deleteById(id);
    }
}