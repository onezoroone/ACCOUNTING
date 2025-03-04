package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.EntityGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EntityGroupRepository extends JpaRepository<EntityGroup, Long> {
    List<EntityGroup> findByEntityGroupNameContainingIgnoreCase(String entityGroupName);
    List<EntityGroup> findByEntityCodeContainingIgnoreCase(String entityCode);
    Optional<EntityGroup> findByEntityCode(String entityCode);
    List<EntityGroup> findByParentCode(String parentCode);
    List<EntityGroup> findByParentIsNull();
}