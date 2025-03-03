package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.TrialBalanceDTO;
import com.vacom.accounting_system.entity.Account;
import com.vacom.accounting_system.entity.VoucherDetail;
import com.vacom.accounting_system.repository.AccountRepository;
import com.vacom.accounting_system.repository.VoucherDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrialBalanceService {
    @Autowired
    private VoucherDetailRepository voucherDetailRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<TrialBalanceDTO> getTrialBalance(Date startDate, Date endDate) {
        List<VoucherDetail> voucherDetails = voucherDetailRepository.findByVoucherDateBetween(startDate, endDate);

        // Group by account and calculate the trial balance
        return accountRepository.findAll().stream().map(account -> {
            Double debitOpening = 0.0;
            Double creditOpening = 0.0;
            Double debitTransaction = 0.0;
            Double creditTransaction = 0.0;

            for (VoucherDetail detail : voucherDetails) {
                if (detail.getAccountDebit().equals(account)) {
                    debitTransaction += detail.getAmount();
                }
                if (detail.getAccountCredit().equals(account)) {
                    creditTransaction += detail.getAmount();
                }
            }

            Double debitClosing = debitOpening + debitTransaction - creditTransaction;
            Double creditClosing = creditOpening + creditTransaction - debitTransaction;

            return new TrialBalanceDTO(
                    account.getAccountCode(),
                    account.getAccountName(),
                    debitOpening,
                    creditOpening,
                    debitTransaction,
                    creditTransaction,
                    debitClosing,
                    creditClosing
            );
        }).collect(Collectors.toList());
    }

    public TrialBalanceDTO getTrialBalanceByAccountCode(String accountCode) {
        Account account = accountRepository.findByAccountCode(accountCode)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        List<VoucherDetail> voucherDetails = voucherDetailRepository.findByVoucherDateBetween(new Date(0), new Date());

        Double debitOpening = 0.0;
        Double creditOpening = 0.0;
        Double debitTransaction = 0.0;
        Double creditTransaction = 0.0;

        for (VoucherDetail detail : voucherDetails) {
            if (detail.getAccountDebit().equals(account)) {
                debitTransaction += detail.getAmount();
            }
            if (detail.getAccountCredit().equals(account)) {
                creditTransaction += detail.getAmount();
            }
        }

        Double debitClosing = debitOpening + debitTransaction - creditTransaction;
        Double creditClosing = creditOpening + creditTransaction - debitTransaction;

        return new TrialBalanceDTO(
                account.getAccountCode(),
                account.getAccountName(),
                debitOpening,
                creditOpening,
                debitTransaction,
                creditTransaction,
                debitClosing,
                creditClosing
        );
    }
}