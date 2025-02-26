package com.vacom.accounting_system.controller;

import com.vacom.accounting_system.model.Partner;
import com.vacom.accounting_system.service.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
public class PartnerController {

    @Autowired
    private PartnerService partnerService;

    // Create
    @PostMapping
    public ResponseEntity<Partner> createPartner(@RequestBody Partner partner) {
        try {
            Partner createdPartner = partnerService.createPartner(partner);
            return ResponseEntity.ok(createdPartner);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Read (Get all)
    @GetMapping
    public ResponseEntity<List<Partner>> getAllPartners() {
        List<Partner> partners = partnerService.getAllPartners();
        return ResponseEntity.ok(partners);
    }

    // Read (Get by ID)
    @GetMapping("/{id}")
    public ResponseEntity<Partner> getPartnerById(@PathVariable Integer id) {
        return partnerService.getPartnerById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Partner> updatePartner(@PathVariable Integer id, @RequestBody Partner partnerDetails) {
        try {
            Partner updatedPartner = partnerService.updatePartner(id, partnerDetails);
            return ResponseEntity.ok(updatedPartner);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePartner(@PathVariable Integer id) {
        try {
            partnerService.deletePartner(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Search
    @GetMapping("/search")
    public ResponseEntity<List<Partner>> searchPartners(@RequestParam String keyword) {
        List<Partner> partners = partnerService.searchPartners(keyword);
        return ResponseEntity.ok(partners);
    }
}