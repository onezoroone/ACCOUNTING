package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.TrialBalanceDTO;
import com.vacom.accounting_system.entity.Account;
import com.vacom.accounting_system.entity.VoucherDetail;
import com.vacom.accounting_system.repository.AccountRepository;
import com.vacom.accounting_system.repository.VoucherDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrialBalanceService {

    private final VoucherDetailRepository voucherDetailRepository;
    private final AccountRepository accountRepository;

    public List<TrialBalanceDTO> getTrialBalance(Date startDate, Date endDate) {
        List<VoucherDetail> openingDetails = voucherDetailRepository.findByVoucherVoucherDateBefore(startDate);
        List<VoucherDetail> periodDetails = voucherDetailRepository.findByVoucherVoucherDateBetween(startDate, endDate);

        return accountRepository.findAll().stream().map(account -> {
            Double debitOpening = calculateOpeningDebit(openingDetails, account);
            Double creditOpening = calculateOpeningCredit(openingDetails, account);
            Double debitTransaction = calculateTransactionDebit(periodDetails, account);
            Double creditTransaction = calculateTransactionCredit(periodDetails, account);

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

    public TrialBalanceDTO getTrialBalanceByAccountCode(String accountCode, Date startDate, Date endDate) {
        Account account = accountRepository.findByAccountCode(accountCode)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        List<VoucherDetail> openingDetails = voucherDetailRepository.findByVoucherVoucherDateBefore(startDate);
        List<VoucherDetail> periodDetails = voucherDetailRepository.findByVoucherVoucherDateBetween(startDate, endDate);

        Double debitOpening = calculateOpeningDebit(openingDetails, account);
        Double creditOpening = calculateOpeningCredit(openingDetails, account);
        Double debitTransaction = calculateTransactionDebit(periodDetails, account);
        Double creditTransaction = calculateTransactionCredit(periodDetails, account);

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

    private List<VoucherDetail> findByVoucherVoucherDateBefore(Date startDate) {
        return voucherDetailRepository.findByVoucherVoucherDateBetween(new Date(0), new Date(startDate.getTime() - 1));
    }

    private Double calculateOpeningDebit(List<VoucherDetail> details, Account account) {
        return details.stream()
                .filter(detail -> detail.getAccountDebit().equals(account))
                .mapToDouble(VoucherDetail::getAmount)
                .sum();
    }

    private Double calculateOpeningCredit(List<VoucherDetail> details, Account account) {
        return details.stream()
                .filter(detail -> detail.getAccountCredit().equals(account))
                .mapToDouble(VoucherDetail::getAmount)
                .sum();
    }

    private Double calculateTransactionDebit(List<VoucherDetail> details, Account account) {
        return details.stream()
                .filter(detail -> detail.getAccountDebit().equals(account))
                .mapToDouble(VoucherDetail::getAmount)
                .sum();
    }

    private Double calculateTransactionCredit(List<VoucherDetail> details, Account account) {
        return details.stream()
                .filter(detail -> detail.getAccountCredit().equals(account))
                .mapToDouble(VoucherDetail::getAmount)
                .sum();
    }
}