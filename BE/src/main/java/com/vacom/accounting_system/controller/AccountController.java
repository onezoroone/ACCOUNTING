package com.vacom.accounting_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vacom.accounting_system.model.Account;
import com.vacom.accounting_system.service.AccountService;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    // Tạo tài khoản mới
    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    // Lấy tất cả tài khoản
    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    // Lấy tài khoản theo mã tài khoản
    @GetMapping("/code/{accountCode}")
    public Account getAccountByCode(@PathVariable String accountCode) {
        return accountService.getAccountByCode(accountCode);
    }


    // Cập nhật tài khoản
    @PutMapping("/{id}")
    public Account updateAccount(@PathVariable Integer id, @RequestBody Account accountDetails) {
        return accountService.updateAccount(id, accountDetails);
    }


    // Xóa tài khoản
    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Integer id) {
        accountService.deleteAccount(id);
    }
}