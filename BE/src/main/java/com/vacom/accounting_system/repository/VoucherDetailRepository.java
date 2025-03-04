package com.vacom.accounting_system.repository;

import com.vacom.accounting_system.entity.VoucherDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface VoucherDetailRepository extends JpaRepository<VoucherDetail, Integer> {
    List<VoucherDetail> findByVoucherId(Integer voucherId);

    @Query("SELECT vd FROM VoucherDetail vd WHERE vd.voucher.id = :voucherId " +
            "AND (:descriptionContains IS NULL OR LOWER(vd.description) LIKE LOWER(CONCAT('%', :descriptionContains, '%'))) AND " +
            "(:oppositeAccounts IS NULL OR LOWER(vd.accountDebit.accountCode) IN :oppositeAccounts OR LOWER(vd.accountCredit.accountCode) IN :oppositeAccounts)")
    List<VoucherDetail> findByVoucherIdAndFilters(Integer voucherId, String descriptionContains, List<String> oppositeAccounts);

    @Query("SELECT vd FROM VoucherDetail vd WHERE vd.voucher.voucherDate BETWEEN :startDate AND :endDate")
    List<VoucherDetail> findByVoucherVoucherDateBetween(Date startDate, Date endDate);

    List<VoucherDetail> findByVoucherVoucherDateBefore(Date date);
}