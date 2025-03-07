package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.RoleCreateDTO;
import com.vacom.accounting_system.dto.response.RolePermissionResponse;
import com.vacom.accounting_system.entity.Permission;
import com.vacom.accounting_system.entity.Role;
import com.vacom.accounting_system.service.PermissionService;
import com.vacom.accounting_system.service.RoleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
@Tag(name = "Vai trò", description = "API vai trò")
public class RoleController     {
    @Autowired
    private RoleService roleService;
    @Autowired
    private PermissionService permissionService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('CREATE_ROLE')")
    public Role createRole(@RequestBody RoleCreateDTO dto) {

        return roleService.createRole(dto);
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('VIEW_ROLE')")
    public ResponseEntity<RolePermissionResponse> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        List<Permission> permissions = permissionService.getAllPermissions();

        RolePermissionResponse response = new RolePermissionResponse();
        response.setRoles(roles);
        response.setPermissions(permissions);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/role/{roleName}")
    @PreAuthorize("hasAnyAuthority('VIEW_ROLE')")
    public Optional<Role> getRoleyByName(@PathVariable String roleName) {
        return roleService.getRoleByName(roleName);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_ROLE')")
    public Role updateRole(@PathVariable Integer id, @RequestBody RoleCreateDTO roleDetails) {
        return roleService.updateRole(id, roleDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EDIT_ROLE')")
    public void deleteRole(@PathVariable Integer id) {
        roleService.deleteRole(id);
    }
}
