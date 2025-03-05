package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByAccountCode(String accountCode);
    boolean existsByAccountCode(String accountCode);
    List<Account> findAllByAccountCodeIn(List<String> accountCodes);
    List<Account> findByParentIdIsNull();
    List<Account> findByAccountCodeStartingWith(String prefix);
}