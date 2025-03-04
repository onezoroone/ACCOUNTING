package com.vacom.accounting_system.service;

import com.vacom.accounting_system.model.EntityModel;
import com.vacom.accounting_system.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntityService {

    @Autowired
    private EntityRepository entityRepository;

    // Tạo mới đối tượng
    public EntityModel createEntity(EntityModel entity) {
        return entityRepository.save(entity);
    }

    // Lấy đối tượng theo id
    public Optional<EntityModel> getEntityById(Integer id) {
        return entityRepository.findById(id);
    }

    // Cập nhật đối tượng
    public EntityModel updateEntity(EntityModel entity) {
        return entityRepository.save(entity);
    }

    // Xóa đối tượng
    public void deleteEntity(Integer id) {
        entityRepository.deleteById(id);
    }

    // Tìm kiếm và filter với Pageable và Specification
    public Page<EntityModel> searchEntities(Specification<EntityModel> spec, Pageable pageable) {
        return entityRepository.findAll(spec, pageable);
    }

    // Lấy toàn bộ danh sách entities
    public List<EntityModel> getAllEntities() {
        return entityRepository.findAll();
    }
}
