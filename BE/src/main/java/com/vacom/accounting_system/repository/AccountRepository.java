package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {
}