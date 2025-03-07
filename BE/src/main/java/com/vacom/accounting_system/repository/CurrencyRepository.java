package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CurrencyRepository extends JpaRepository<Currency, Integer> {
    Optional<Currency> findByCurrencyCode(String currencyCode);
    boolean existsByCurrencyCode(String currencyCode);
    boolean existsByCurrencyCodeAndIdNot(String currencyCode, Integer id);
}
