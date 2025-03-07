package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.RoleCreateDTO;
import com.vacom.accounting_system.entity.Permission;
import com.vacom.accounting_system.entity.Role;
import com.vacom.accounting_system.exception.ResourceAlreadyExistsException;
import com.vacom.accounting_system.repository.PermissionRepository;
import com.vacom.accounting_system.repository.RoleRepository;
import com.vacom.accounting_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role createRole(@RequestBody RoleCreateDTO dto) {
        if (roleRepository.existsByRoleName(dto.getRoleName())){
            throw new ResourceAlreadyExistsException("Role name already exists");
        }

        Role role = new Role();
        role.setRoleName(dto.getRoleName());
        role.setDescription(dto.getDescription());

        Set<Permission> permissions = dto.getPermissionIds().stream()
                .map(id -> permissionRepository.findById(Long.valueOf(id)).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
        role.setPermissions(permissions);

        return roleRepository.save(role);
    }

    public Role updateRole(@PathVariable Integer id, @RequestBody RoleCreateDTO dto) {
        Role role = roleRepository.findById(Integer.toUnsignedLong(id)).orElseThrow(() -> new RuntimeException("Role not found"));

        boolean isRoleExists = roleRepository.existsByRoleNameAndIdNot(
                dto.getRoleName(), Integer.toUnsignedLong(id));

        if (isRoleExists) {
            throw new ResourceAlreadyExistsException("Role name already exists!");
        }

        role.setRoleName(dto.getRoleName());
        role.setDescription(dto.getDescription());

        Set<Permission> permissions = dto.getPermissionIds().stream()
                .map(permId -> permissionRepository.findById(Long.valueOf(permId)).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        role.setPermissions(permissions);

        return roleRepository.save(role);
    }

    public void deleteRole(Integer id) {
        boolean isRoleUsed = userRepository.existsByRoles_Id(Integer.toUnsignedLong(id));
        if (isRoleUsed) {
            throw new ResourceAlreadyExistsException("Role name is already used!");
        }
        roleRepository.deleteById(Integer.toUnsignedLong(id));
    }

    public Optional<Role> getRoleByName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }

}
