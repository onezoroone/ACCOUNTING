package com.vacom.accounting_system.exception;

import lombok.Getter;

@Getter
public class EntityReferenceNotFoundException extends RuntimeException {
    private final String entityType;
    private final String referenceId;

    public EntityReferenceNotFoundException(String entityType, String referenceId) {
        super(String.format("Tham chiếu tới '%s' với mã '%s' không tồn tại trong hệ thống", entityType, referenceId));
        this.entityType = entityType;
        this.referenceId = referenceId;
    }
}
