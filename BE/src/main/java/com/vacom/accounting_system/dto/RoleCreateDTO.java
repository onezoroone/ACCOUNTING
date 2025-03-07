package com.vacom.accounting_system.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class RoleCreateDTO {
    private String roleName;
    private String description;
    private Set<Integer> permissionIds = new HashSet<>();
}
