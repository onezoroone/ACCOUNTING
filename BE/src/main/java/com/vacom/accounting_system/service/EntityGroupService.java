package com.vacom.accounting_system.service;

import com.vacom.accounting_system.entity.EntityGroup;
import com.vacom.accounting_system.repository.EntityGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EntityGroupService {
    @Autowired
    private EntityGroupRepository repository;

    public List<EntityGroup> getAll() {
        return repository.findAll();
    }

    public Optional<EntityGroup> getById(Long id) {
        return repository.findById(id);
    }

    public EntityGroup create(EntityGroup entityGroup) {
        return repository.save(entityGroup);
    }

    public EntityGroup update(Long id, EntityGroup updatedEntityGroup) {
        return repository.findById(id).map(entityGroup -> {
            entityGroup.setEntityCode(updatedEntityGroup.getEntityCode());
            entityGroup.setEntityGroupName(updatedEntityGroup.getEntityGroupName());
            entityGroup.setParentGroup(updatedEntityGroup.getParentGroup());
            return repository.save(entityGroup);
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<EntityGroup> searchByName(String keyword) {
        return repository.findByEntityGroupNameContainingIgnoreCase(keyword);
    }
}
