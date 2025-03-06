package com.vacom.accounting_system.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "entities")
public class BusinessEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tax_code", nullable = false, unique = true)
    private String taxCode;

    @Column(name = "entity_code", nullable = false, unique = true)
    private String entityCode;

    @Column(name = "entity_name", nullable = false)
    private String entityName;

    // Cột mới: entity_group_code, kiểu VARCHAR(50) không null
    @Column(name = "entity_group_code", nullable = false)
    private String entityGroupCode;

    @Column(name = "address")
    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "website")
    private String website;
}
