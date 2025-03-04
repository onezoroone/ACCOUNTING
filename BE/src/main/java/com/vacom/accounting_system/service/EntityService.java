package com.vacom.accounting_system.service;

import com.vacom.accounting_system.entity.BusinessEntity;
import com.vacom.accounting_system.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EntityService {

    @Autowired
    private EntityRepository entityRepository;

    // Tạo mới đối tượng
    public BusinessEntity createEntity(BusinessEntity entity) {
        return entityRepository.save(entity);
    }

    // Lấy đối tượng theo id
    public Optional<BusinessEntity> getEntityById(Integer id) {
        return entityRepository.findById(id);
    }

    // Cập nhật đối tượng
    public BusinessEntity updateEntity(BusinessEntity entity) {
        return entityRepository.save(entity);
    }

    // Xóa đối tượng
    public void deleteEntity(Integer id) {
        entityRepository.deleteById(id);
    }

    // Tìm kiếm và filter với Pageable và Specification
    public Page<BusinessEntity> searchEntities(Specification<BusinessEntity> spec, Pageable pageable) {
        return entityRepository.findAll(spec, pageable);
    }
}
