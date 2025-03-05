package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.entity.EntityGroup;
import com.vacom.accounting_system.service.EntityGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entity-groups")
public class EntityGroupController {
    @Autowired
    private EntityGroupService service;

    @GetMapping
    public List<EntityGroup> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityGroup> getById(@PathVariable Long id) {
        Optional<EntityGroup> entityGroup = service.getById(id);
        return entityGroup.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public EntityGroup create(@RequestBody EntityGroup entityGroup) {
        return service.create(entityGroup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntityGroup> update(@PathVariable Long id, @RequestBody EntityGroup entityGroup) {
        EntityGroup updated = service.update(id, entityGroup);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<EntityGroup> searchByName(@RequestParam String keyword) {
        return service.searchByName(keyword);
    }
}
