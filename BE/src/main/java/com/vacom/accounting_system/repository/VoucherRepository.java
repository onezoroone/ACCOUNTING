package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    Page<Voucher> findByVoucherDateBetween(Date startDate, Date endDate, Pageable pageable);
}

