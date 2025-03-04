package com.vacom.accounting_system.service;

import com.vacom.accounting_system.entity.Partner;
import com.vacom.accounting_system.repository.PartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream; // Thêm import này
import java.util.stream.Collectors; // Thêm import này
@Service
public class PartnerService {

    @Autowired
    private PartnerRepository partnerRepository;

    // Create
    public Partner createPartner(Partner partner) {
        // Thêm validation nếu cần (ví dụ: kiểm tra partnerName không rỗng)
        if (partner.getPartnerName() == null || partner.getPartnerName().trim().isEmpty()) {
            throw new IllegalArgumentException("Partner name cannot be empty");
        }
        return partnerRepository.save(partner);
    }

    // Read (Get all)
    public List<Partner> getAllPartners() {
        return partnerRepository.findAll();
    }

    // Read (Get by ID)
    public Optional<Partner> getPartnerById(Integer id) {
        return partnerRepository.findById(id);
    }

    // Update
    public Partner updatePartner(Integer id, Partner partnerDetails) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner not found with id: " + id));

        partner.setPartnerName(partnerDetails.getPartnerName());
        partner.setAddress(partnerDetails.getAddress());
        partner.setPhoneNumber(partnerDetails.getPhoneNumber());
        partner.setTaxCode(partnerDetails.getTaxCode());

        return partnerRepository.save(partner);
    }

    // Delete
    public void deletePartner(Integer id) {
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner not found with id: " + id));
        partnerRepository.delete(partner);
    }

    // Search (theo tên hoặc mã số thuế)
    public List<Partner> searchPartners(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllPartners(); // Trả về tất cả nếu không có keyword
        }
        // Tìm theo tên hoặc mã số thuế
        List<Partner> byName = partnerRepository.findByPartnerNameContainingIgnoreCase(keyword);
        List<Partner> byTaxCode = partnerRepository.findByTaxCodeContainingIgnoreCase(keyword);
        // Kết hợp kết quả (loại bỏ trùng lặp)
        return Stream.concat(byName.stream(), byTaxCode.stream())
                .distinct()
                .collect(Collectors.toList());
    }
}