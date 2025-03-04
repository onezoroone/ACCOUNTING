package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.entity.Account;
import com.vacom.accounting_system.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/master-data/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('CREATE_ACCOUNT')")
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('VIEW_ACCOUNT')")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/code/{accountCode}")
    @PreAuthorize("hasAnyAuthority('VIEW_ACCOUNT')")
    public Optional<Account> getAccountByCode(@PathVariable String accountCode) {
        return accountService.getAccountByCode(accountCode);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_ACCOUNT')")
    public Account updateAccount(@PathVariable Integer id, @RequestBody Account accountDetails) {
        return accountService.updateAccount(id, accountDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_ACCOUNT')") // Giả sử DELETE cũng cần EDIT_ACCOUNT
    public void deleteAccount(@PathVariable Integer id) {
        accountService.deleteAccount(id);
    }
}