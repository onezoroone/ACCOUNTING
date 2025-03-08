package com.vacom.accounting_system.service;

import com.vacom.accounting_system.entity.Permission;
import com.vacom.accounting_system.exception.ResourceAlreadyExistsException;
import com.vacom.accounting_system.repository.PermissionRepository;
import com.vacom.accounting_system.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public Permission createPermission(Permission permission) {
        if (permissionRepository.existsByPermissionName(permission.getPermissionName())){
            throw new ResourceAlreadyExistsException("Permission name already exists");
        }

        return permissionRepository.save(permission);
    }

    public Permission updatePermission(Integer id, Permission permissionDetails) {
        Permission permission = permissionRepository.findById(Integer.toUnsignedLong(id)).orElseThrow(() -> new RuntimeException("Permission not found"));

        boolean isPermissionExists = permissionRepository.existsByPermissionNameAndIdNot(
                permissionDetails.getPermissionName(), Integer.toUnsignedLong(id));

        if (isPermissionExists) {
            throw new ResourceAlreadyExistsException("Permission name already exists!");
        }

        permission.setPermissionName(permissionDetails.getPermissionName());
        permission.setDescription(permissionDetails.getDescription());
        return permissionRepository.save(permission);
    }

    public void deletePermission(Integer id) {
        Long permissionId = Integer.toUnsignedLong(id);

        boolean isPermissionUsed = roleRepository.existsByPermissionsId(permissionId);

        if(isPermissionUsed){
            throw new ResourceAlreadyExistsException("This permission is already used");
        }
        permissionRepository.deleteById(permissionId);
    }

    public Optional<Permission> getPermissionByName(String permissionName) {
        return permissionRepository.findByPermissionName(permissionName);
    }
}
