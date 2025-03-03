package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.model.EntityModel;
import com.vacom.accounting_system.service.EntityService;
import com.vacom.accounting_system.specification.EntitySpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/entities")
public class EntityController {

    @Autowired
    private EntityService entityService;

    @PostMapping
    public ResponseEntity<EntityModel> createEntity(@RequestBody EntityModel entity) {
        EntityModel savedEntity = entityService.createEntity(entity);
        return ResponseEntity.ok(savedEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityModel> getEntityById(@PathVariable Integer id) {
        return entityService.getEntityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntityModel> updateEntity(@PathVariable Integer id, @RequestBody EntityModel entity) {
        if (!entityService.getEntityById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        return ResponseEntity.ok(entityService.updateEntity(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntity(@PathVariable Integer id) {
        entityService.deleteEntity(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint cho filter & search
    @GetMapping
    public ResponseEntity<Page<EntityModel>> searchEntities(
            @RequestParam(required = false) String taxCode,
            @RequestParam(required = false) String entityName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Specification<EntityModel> spec = Specification.where(null);

        if (taxCode != null && !taxCode.isEmpty()) {
            spec = spec.and(EntitySpecification.hasTaxCode(taxCode));
        }
        if (entityName != null && !entityName.isEmpty()) {
            spec = spec.and(EntitySpecification.hasEntityNameLike(entityName));
        }

        Page<EntityModel> result = entityService.searchEntities(spec, pageable);
        return ResponseEntity.ok(result);
    }
}
