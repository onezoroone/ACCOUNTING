package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.TrialBalanceDTO;
import com.vacom.accounting_system.dto.response.TrialBalanceResponseDTO;
import com.vacom.accounting_system.entity.Account;
import com.vacom.accounting_system.entity.VoucherDetail;
import com.vacom.accounting_system.repository.AccountRepository;
import com.vacom.accounting_system.repository.VoucherDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrialBalanceService {

    private final VoucherDetailRepository voucherDetailRepository;
    private final AccountRepository accountRepository;

    public Page<TrialBalanceResponseDTO> getTrialBalance(Pageable pageable, Date startDate, Date endDate) {
        Specification<VoucherDetail> spec = Specification.where(null);

        // Nếu không có startDate, lấy mặc định là đầu năm hiện tại
        if (startDate == null) {
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.DAY_OF_YEAR, 1);
            startDate = calendar.getTime();
        }

        // Nếu không có endDate, lấy mặc định là ngày hiện tại
        if (endDate == null) {
            endDate = new Date();
        }

        List<VoucherDetail> openingDetails = voucherDetailRepository.findByVoucherVoucherDateBefore(startDate);
        List<VoucherDetail> periodDetails = voucherDetailRepository.findByVoucherVoucherDateBetween(startDate, endDate);

        Page<Account> accountPage = accountRepository.findAll(pageable);

        return accountPage.map(account -> {
            Double debitOpening = calculateOpeningDebit(openingDetails, account);
            Double creditOpening = calculateOpeningCredit(openingDetails, account);
            Double debitTransaction = calculateTransactionDebit(periodDetails, account);
            Double creditTransaction = calculateTransactionCredit(periodDetails, account);

            Double debitClosing = debitOpening + debitTransaction - creditTransaction;
            Double creditClosing = creditOpening + creditTransaction - debitTransaction;

            return new TrialBalanceResponseDTO(
                    account.getAccountCode(),
                    account.getAccountName(),
                    debitOpening,
                    creditOpening,
                    debitTransaction,
                    creditTransaction,
                    debitClosing,
                    creditClosing
            );
        });
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