package com.vacom.accounting_system.dto.response;

import com.vacom.accounting_system.entity.Permission;
import com.vacom.accounting_system.entity.Role;
import lombok.Data;

import java.util.List;
@Data
public class RolePermissionResponse {
    private List<Role> roles;
    private List<Permission> permissions;
}
