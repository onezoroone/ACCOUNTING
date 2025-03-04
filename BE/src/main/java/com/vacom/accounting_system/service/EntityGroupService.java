package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.EntityGroupDTO;
import com.vacom.accounting_system.entity.EntityGroup;
import com.vacom.accounting_system.repository.EntityGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class EntityGroupService {

    @Autowired
    private EntityGroupRepository entityGroupRepository;

    // Chuyển đổi Entity sang DTO
    private EntityGroupDTO convertToDTO(EntityGroup entityGroup) {
        return EntityGroupDTO.builder()
                .id(entityGroup.getId())
                .entityCode(entityGroup.getEntityCode())
                .entityGroupName(entityGroup.getEntityGroupName())
                .parentCode(entityGroup.getParentCode())
                .build();
    }

    // Chuyển đổi DTO sang Entity
    private EntityGroup convertToEntity(EntityGroupDTO dto) {
        EntityGroup entityGroup = EntityGroup.builder()
                .id(dto.getId())
                .entityCode(dto.getEntityCode())
                .entityGroupName(dto.getEntityGroupName())
                .build();

        // Thiết lập parent nếu có parentCode
        if (dto.getParentCode() != null && !dto.getParentCode().isEmpty()) {
            entityGroupRepository.findByEntityCode(dto.getParentCode())
                    .ifPresent(parentEntity -> {
                        entityGroup.setParent(parentEntity);
                    });
        }

        return entityGroup;
    }

    // Tạo mới
    public EntityGroupDTO createEntityGroup(EntityGroupDTO dto) {
        if (dto.getEntityCode() == null || dto.getEntityCode().trim().isEmpty()) {
            throw new IllegalArgumentException("Entity code không được để trống");
        }

        if (dto.getEntityGroupName() == null || dto.getEntityGroupName().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên nhóm không được để trống");
        }

        // Kiểm tra mã đã tồn tại chưa
        if (entityGroupRepository.findByEntityCode(dto.getEntityCode()).isPresent()) {
            throw new IllegalArgumentException("Mã entity đã tồn tại: " + dto.getEntityCode());
        }

        EntityGroup entityGroup = convertToEntity(dto);
        EntityGroup savedEntity = entityGroupRepository.save(entityGroup);
        return convertToDTO(savedEntity);
    }

    // Lấy tất cả
    public List<EntityGroupDTO> getAllEntityGroups() {
        return entityGroupRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy theo ID
    public EntityGroupDTO getEntityGroupById(Long id) {
        return entityGroupRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhóm với ID: " + id));
    }

    // Lấy theo mã
    public EntityGroupDTO getEntityGroupByCode(String code) {
        return entityGroupRepository.findByEntityCode(code)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhóm với mã: " + code));
    }

    // Cập nhật
    public EntityGroupDTO updateEntityGroup(Long id, EntityGroupDTO dto) {
        EntityGroup entityGroup = entityGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhóm với ID: " + id));

        entityGroup.setEntityGroupName(dto.getEntityGroupName());

        // Chỉ cập nhật entityCode nếu không trùng với mã khác
        if (!entityGroup.getEntityCode().equals(dto.getEntityCode())) {
            entityGroupRepository.findByEntityCode(dto.getEntityCode())
                    .ifPresent(e -> {
                        if (!e.getId().equals(id)) {
                            throw new IllegalArgumentException("Mã entity đã tồn tại: " + dto.getEntityCode());
                        }
                    });
            entityGroup.setEntityCode(dto.getEntityCode());
        }

        // Cập nhật parent nếu có thay đổi
        if (dto.getParentCode() != null && !dto.getParentCode().equals(entityGroup.getParentCode())) {
            // Kiểm tra không tạo vòng lặp (entityGroup không thể là parent của chính nó)
            if (dto.getParentCode().equals(entityGroup.getEntityCode())) {
                throw new IllegalArgumentException("Nhóm không thể là cha của chính nó");
            }

            entityGroupRepository.findByEntityCode(dto.getParentCode())
                    .ifPresentOrElse(
                            entityGroup::setParent,
                            () -> {
                                if (!dto.getParentCode().isEmpty()) {
                                    throw new RuntimeException("Không tìm thấy nhóm cha với mã: " + dto.getParentCode());
                                }
                            }
                    );
        }

        EntityGroup updatedEntity = entityGroupRepository.save(entityGroup);
        return convertToDTO(updatedEntity);
    }

    // Xóa
    public void deleteEntityGroup(Long id) {
        EntityGroup entityGroup = entityGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhóm với ID: " + id));

        // Kiểm tra xem có nhóm con không
        List<EntityGroup> children = entityGroupRepository.findByParentCode(entityGroup.getEntityCode());
        if (!children.isEmpty()) {
            throw new IllegalStateException("Không thể xóa nhóm có chứa nhóm con. Hãy xóa các nhóm con trước.");
        }

        entityGroupRepository.delete(entityGroup);
    }

    // Tìm kiếm
    public List<EntityGroupDTO> searchEntityGroups(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllEntityGroups();
        }

        List<EntityGroup> byName = entityGroupRepository.findByEntityGroupNameContainingIgnoreCase(keyword);
        List<EntityGroup> byCode = entityGroupRepository.findByEntityCodeContainingIgnoreCase(keyword);

        return Stream.concat(byName.stream(), byCode.stream())
                .distinct()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy danh sách các nhóm cấp cao nhất (không có parent)
    public List<EntityGroupDTO> getRootEntityGroups() {
        return entityGroupRepository.findByParentIsNull().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy danh sách các nhóm con
    public List<EntityGroupDTO> getChildEntityGroups(String parentCode) {
        return entityGroupRepository.findByParentCode(parentCode).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}