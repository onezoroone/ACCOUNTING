package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByPermissionName(String permissionName);
    boolean existsByPermissionName(String permissionName);
    boolean existsByPermissionNameAndIdNot(String permissionName, Long id);
}
