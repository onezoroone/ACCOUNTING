package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.Voucher;
import com.vacom.accounting_system.entity.VoucherDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    Page<Voucher> findByVoucherDateBetween(Date startDate, Date endDate, Pageable pageable);
}