package com.vacom.accounting_system.repository;

<<<<<<< HEAD
import com.vacom.accounting_system.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountCode(String accountCode);
    boolean existsByAccountCode(String accountCode);
    List<Account> findAllByAccountCodeIn(List<String> accountCodes);
=======
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vacom.accounting_system.model.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    // Tìm kiếm tài khoản theo mã tài khoản (accountCode)
    Account findByAccountCode(String accountCode);

    // Tìm tất cả tài khoản không có parent (các tài khoản cha)
    List<Account> findByParentIdIsNull();
>>>>>>> origin/tk
}

