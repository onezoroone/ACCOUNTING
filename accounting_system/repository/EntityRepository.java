package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.model.EntityModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface EntityRepository extends JpaRepository<EntityModel, Integer>, JpaSpecificationExecutor<EntityModel> {
    Optional<EntityModel> findByTaxCode(String taxCode);
    Optional<EntityModel> findByEntityCode(String entityCode);
}
