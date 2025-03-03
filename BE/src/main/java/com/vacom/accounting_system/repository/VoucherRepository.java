package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    List<Voucher> findByVoucherDateBetween(Date startDate, Date endDate);
}
