package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.BusinessEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface EntityRepository extends JpaRepository<BusinessEntity, Integer>, JpaSpecificationExecutor<BusinessEntity> {
    Optional<BusinessEntity> findByTaxCode(String taxCode);
    Optional<BusinessEntity> findByEntityCode(String entityCode);
}
