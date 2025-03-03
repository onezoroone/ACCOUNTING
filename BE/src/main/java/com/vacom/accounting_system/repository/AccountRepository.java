package com.vacom.accounting_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vacom.accounting_system.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    // Tìm kiếm tài khoản theo mã tài khoản (accountCode)
    Account findByAccountCode(String accountCode);

    // Tìm tất cả tài khoản không có parent (các tài khoản cha)
    List<Account> findByParentIdIsNull();
}