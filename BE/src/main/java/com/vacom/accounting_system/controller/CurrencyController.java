package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.entity.Currency;
import com.vacom.accounting_system.service.CurrencyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/master-data/currencies")
@Tag(name = "Tiền tệ", description = "API tiền tệ")
public class CurrencyController     {
    @Autowired
    private CurrencyService currencyService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('CREATE_CURRENCY')")
    public Currency createCurrency(@RequestBody Currency currency) {
        return currencyService.createCurrency(currency);
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('VIEW_CURRENCY')")
    public List<Currency> getAllCurrencies() {
        return currencyService.getAllCurrencies();
    }

    @GetMapping("/code/{currencyCode}")
    @PreAuthorize("hasAnyAuthority('VIEW_CURRENCY')")
    public Optional<Currency> getCurrencyByCode(@PathVariable String currencyCode) {
        return currencyService.getAccountByCode(currencyCode);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_CURRENCY')")
    public Currency updateCurrency(@PathVariable Integer id, @RequestBody Currency currencyDetails) {
        return currencyService.updateCurrency(id, currencyDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_CURRENCY')")
    public void deleteCurrency(@PathVariable Integer id) {currencyService.deleteCurrency(id);}
}
