package com.vacom.accounting_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "entities")
public class Entity {

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

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getEntityCode() {
        return entityCode;
    }

    public void setEntityCode(String entityCode) {
        this.entityCode = entityCode;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityGroupCode() {
        return entityGroupCode;
    }

    public void setEntityGroupCode(String entityGroupCode) {
        this.entityGroupCode = entityGroupCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
