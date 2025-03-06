package com.vacom.accounting_system.service;

import java.util.List;
import java.util.Optional;

import com.vacom.accounting_system.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vacom.accounting_system.repository.AccountRepository;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    // Lấy tất cả tài khoản
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    // Tạo mới tài khoản
    public Account createAccount(Account account) {
        Optional<Account> existingAccount = accountRepository.findByAccountCode(account.getAccountCode());
        if (existingAccount.isPresent()) {
            throw new RuntimeException("Tài khoản đã tồn tại");
        }
        return accountRepository.save(account);
    }

    // Cập nhật tài khoản
    public Account updateAccount(Integer id, Account accountDetails) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìn thấy tài khoản"));
        account.setAccountCode(accountDetails.getAccountCode());
        account.setAccountName(accountDetails.getAccountName());
        account.setAccountType(accountDetails.getAccountType());
        account.setParentId(accountDetails.getParentId());
        return accountRepository.save(account);
    }

    // Xóa tài khoản
    public void deleteAccount(Integer id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìn thấy tài khoản"));
        accountRepository.deleteById(id);
    }

    // Tìm tài khoản theo mã tài khoản
    public Optional<Account> getAccountByCode(String accountCode) {
        Optional<Account> account = accountRepository.findByAccountCode(accountCode);
        if (!account.isPresent()) {
            throw new RuntimeException("Không tìm thấy tài khoản mã: " + accountCode);
        }
        return accountRepository.findByAccountCode(accountCode);
    }
}