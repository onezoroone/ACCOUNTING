package com.vacom.accounting_system.controller;

import java.util.List;
import java.util.Optional;

import com.vacom.accounting_system.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vacom.accounting_system.service.AccountService;

@RestController
@RequestMapping("/api/master-data/accounts")
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
    public Optional<Account> getAccountByCode(@PathVariable String accountCode) {
        return accountService.getAccountByCode(accountCode);
    }

//    // Lấy tài khoản theo parent_id
//    @GetMapping("/parent/{parentId}")
//    public List<Account> getAccountsByParentId(@PathVariable Integer parentId) {
//        return accountService.getAccountsByParentId(parentId);
//    }

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