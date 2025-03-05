package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.EntityGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EntityGroupRepository extends JpaRepository<EntityGroup, Long> {
    List<EntityGroup> findByEntityGroupNameContainingIgnoreCase(String keyword);
}
