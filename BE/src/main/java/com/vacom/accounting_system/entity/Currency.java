package com.vacom.accounting_system.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "currencies")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "currency_code", length = 10, nullable = false)
    private String currencyCode;

    @Column(name = "exchange_rate", nullable = false)
    @Positive(message = "Exchange rate must be positive")
    private Double exchangeRate;

    @Column(name = "currency_name", nullable = false)
    private String currencyName;
}
