package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.dto.EntityGroupDTO;
import com.vacom.accounting_system.service.EntityGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/master-data/entity-groups")
public class EntityGroupController {

    @Autowired
    private EntityGroupService entityGroupService;

    @PostMapping
    public ResponseEntity<EntityGroupDTO> createEntityGroup(@RequestBody EntityGroupDTO entityGroupDTO) {
        try {
            EntityGroupDTO createdGroup = entityGroupService.createEntityGroup(entityGroupDTO);
            return new ResponseEntity<>(createdGroup, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<EntityGroupDTO>> getAllEntityGroups() {
        List<EntityGroupDTO> entityGroups = entityGroupService.getAllEntityGroups();
        return new ResponseEntity<>(entityGroups, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityGroupDTO> getEntityGroupById(@PathVariable Long id) {
        try {
            EntityGroupDTO entityGroup = entityGroupService.getEntityGroupById(id);
            return new ResponseEntity<>(entityGroup, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<EntityGroupDTO> getEntityGroupByCode(@PathVariable String code) {
        try {
            EntityGroupDTO entityGroup = entityGroupService.getEntityGroupByCode(code);
            return new ResponseEntity<>(entityGroup, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntityGroupDTO> updateEntityGroup(
            @PathVariable Long id,
            @RequestBody EntityGroupDTO entityGroupDTO) {
        try {
            EntityGroupDTO updatedGroup = entityGroupService.updateEntityGroup(id, entityGroupDTO);
            return new ResponseEntity<>(updatedGroup, HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e instanceof IllegalArgumentException) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntityGroup(@PathVariable Long id) {
        try {
            entityGroupService.deleteEntityGroup(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            if (e instanceof IllegalStateException) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<EntityGroupDTO>> searchEntityGroups(@RequestParam String keyword) {
        List<EntityGroupDTO> entityGroups = entityGroupService.searchEntityGroups(keyword);
        return new ResponseEntity<>(entityGroups, HttpStatus.OK);
    }

    @GetMapping("/root")
    public ResponseEntity<List<EntityGroupDTO>> getRootEntityGroups() {
        List<EntityGroupDTO> rootGroups = entityGroupService.getRootEntityGroups();
        return new ResponseEntity<>(rootGroups, HttpStatus.OK);
    }

    @GetMapping("/children/{parentCode}")
    public ResponseEntity<List<EntityGroupDTO>> getChildEntityGroups(@PathVariable String parentCode) {
        List<EntityGroupDTO> childGroups = entityGroupService.getChildEntityGroups(parentCode);
        return new ResponseEntity<>(childGroups, HttpStatus.OK);
    }
}