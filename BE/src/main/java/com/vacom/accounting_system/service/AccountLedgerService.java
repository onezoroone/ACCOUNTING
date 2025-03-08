package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.AccountLedgerReportDTO;
import com.vacom.accounting_system.entity.Account;
import com.vacom.accounting_system.entity.Voucher;
import com.vacom.accounting_system.entity.VoucherDetail;
import com.vacom.accounting_system.exception.ResourceNotFoundException;
import com.vacom.accounting_system.repository.AccountRepository;
import com.vacom.accounting_system.repository.VoucherDetailRepository;
import com.vacom.accounting_system.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class AccountLedgerService {

    private final AccountRepository accountRepository;
    private final VoucherRepository voucherRepository;
    private final VoucherDetailRepository voucherDetailRepository;

    public List<AccountLedgerReportDTO> getAccountLedgerReport(List<String> accountCodes, Date startDate, Date endDate,
                                                               String voucherNumberContains, String descriptionContains,
                                                               List<String> oppositeAccounts) {
        if (accountCodes == null || accountCodes.isEmpty()) {
            return new ArrayList<>();
        }

        List<String> validAccountCodes = accountRepository.findAllByAccountCodeIn(accountCodes)
                .stream()
                .map(Account::getAccountCode)
                .toList();

        if (validAccountCodes.size() < accountCodes.size()) {
                List<String> missingAccounts = accountCodes.stream()
                    .filter(code -> !validAccountCodes.contains(code))
                    .collect(Collectors.toList());
            throw new ResourceNotFoundException("Đối tượng", "accountCodes", missingAccounts.getFirst());
        }

        List<Voucher> allVouchers;
        if (startDate != null && endDate != null) {
            allVouchers = voucherRepository.findByVoucherDateBetween(startDate, endDate);
        } else {
            allVouchers = voucherRepository.findAll();
        }

        List<AccountLedgerReportDTO> report = new ArrayList<>();
        Double debitBalance = 0.0;
        Double creditBalance = 0.0;

        for (Voucher voucher : allVouchers) {
            if (voucherNumberContains != null && !voucher.getVoucherNumber().toLowerCase().contains(voucherNumberContains.toLowerCase())) {
                continue;
            }

            List<VoucherDetail> allDetails = voucherDetailRepository.findByVoucherId(voucher.getId());

            for (VoucherDetail detail : allDetails) {
                String debitAccount = detail.getAccountDebit().getAccountCode();
                String creditAccount = detail.getAccountCredit().getAccountCode();

                boolean isRelevant = accountCodes.contains(debitAccount) || accountCodes.contains(creditAccount);
                if (!isRelevant) continue;

                String mainAccount = accountCodes.contains(debitAccount) ? debitAccount : creditAccount;
                String oppositeAccount = mainAccount.equals(debitAccount) ? creditAccount : debitAccount;

                if (oppositeAccounts != null && !oppositeAccounts.isEmpty() && !oppositeAccounts.contains(oppositeAccount)) {
                    continue;
                }

                String description = detail.getDescription() != null ? detail.getDescription() : voucher.getDescription();
                if (descriptionContains != null && !description.toLowerCase().contains(descriptionContains.toLowerCase())) {
                    continue;
                }

                AccountLedgerReportDTO dto = new AccountLedgerReportDTO();
                dto.setDate(voucher.getVoucherDate());
                dto.setVoucherNumber(voucher.getVoucherNumber());
                dto.setDescription(description);
                dto.setOppositeAccount(oppositeAccount);

                boolean isDebit = accountCodes.contains(debitAccount);
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

        return report;
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

    public List<String> getAllAccountCodes() {
        return accountRepository.findAll().stream()
                .map(Account::getAccountCode)
                .collect(Collectors.toList());
    }
}