package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.model.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Integer> {
    // Tìm kiếm theo tên đối tác (không phân biệt hoa thường)
    List<Partner> findByPartnerNameContainingIgnoreCase(String partnerName);
    // Tìm kiếm theo mã số thuế (nếu cần)
    List<Partner> findByTaxCodeContainingIgnoreCase(String taxCode);
}