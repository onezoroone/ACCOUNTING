package com.vacom.accounting_system.specification;

import com.vacom.accounting_system.model.EntityModel;
import org.springframework.data.jpa.domain.Specification;

public class EntitySpecification {

    public static Specification<EntityModel> hasTaxCode(String taxCode) {
        return (root, query, cb) -> cb.equal(root.get("taxCode"), taxCode);
    }

    public static Specification<EntityModel> hasEntityNameLike(String name) {
        return (root, query, cb) -> 
            cb.like(cb.lower(root.get("entityName")), "%" + name.toLowerCase() + "%");
    }

    // Thêm các tiêu chí filter khác nếu cần
}
