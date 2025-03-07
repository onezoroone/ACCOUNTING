package com.vacom.accounting_system.service;

import com.vacom.accounting_system.entity.Currency;
import com.vacom.accounting_system.exception.ResourceAlreadyExistsException;
import com.vacom.accounting_system.repository.CurrencyRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyService {
    @Autowired
    private CurrencyRepository currencyRepository;

    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }

    @Transactional
    public Currency createCurrency(Currency currency) {
        if (currencyRepository.existsByCurrencyCode(currency.getCurrencyCode())){
            throw new ResourceAlreadyExistsException("Currency code already exists");
        }

        return currencyRepository.save(currency);
    }

    public Currency updateCurrency(Integer id, Currency currencyDetails) {
        Currency currency = currencyRepository.findById(id).orElseThrow(() -> new RuntimeException("Currency not found"));

        boolean isCodeExists = currencyRepository.existsByCurrencyCodeAndIdNot(
                currencyDetails.getCurrencyCode(), id);

        if (isCodeExists) {
            throw new ResourceAlreadyExistsException("Currency code already exists!");
        }

        currency.setCurrencyCode(currencyDetails.getCurrencyCode());
        currency.setCurrencyName(currencyDetails.getCurrencyName());
        currency.setExchangeRate(currencyDetails.getExchangeRate());
        return currencyRepository.save(currency);
    }

    public void deleteCurrency(Integer id) {
        currencyRepository.deleteById(id);
    }

    public Optional<Currency> getAccountByCode(String currencyCode) {
        return currencyRepository.findByCurrencyCode(currencyCode);
    }
}
