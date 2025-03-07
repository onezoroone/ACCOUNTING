package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.entity.Permission;
import com.vacom.accounting_system.service.PermissionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/permissions")
@Tag(name = "Quyền", description = "API quyền")
public class PermissionController {
    @Autowired
    private PermissionService permissionService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('CREATE_PERMISSION')")
    public Permission createPermission(@RequestBody Permission permission) {
        return permissionService.createPermission(permission);
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('VIEW_PERMISSION')")
    public List<Permission> getAllPermissions() {
        return permissionService.getAllPermissions();
    }

    @GetMapping("/permission/{permissionName}")
    @PreAuthorize("hasAnyAuthority('VIEW_PERMISSION')")
    public Optional<Permission> getPermissionByName(@PathVariable String permissionName) {
        return permissionService.getPermissionByName(permissionName);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_PERMISSION')")
    public Permission updatePermission(@PathVariable Integer id, @RequestBody Permission permissionDetails) {
        return permissionService.updatePermission(id, permissionDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_PERMISSION')")
    public void deletePermission(@PathVariable Integer id) {permissionService.deletePermission(id);}
}
