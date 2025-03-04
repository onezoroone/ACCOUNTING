package com.vacom.accounting_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EntityGroupDTO {
    private Long id;
    private String entityGroupName;
    private String entityCode;
    private String parentCode;
}
