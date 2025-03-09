package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.VoucherDTO;
import com.vacom.accounting_system.dto.VoucherDetailDTO;
import com.vacom.accounting_system.dto.response.VoucherDetailResponseDTO;
import com.vacom.accounting_system.dto.response.VoucherResponseDTO;
import com.vacom.accounting_system.entity.*;
import com.vacom.accounting_system.exception.EntityReferenceNotFoundException;
import com.vacom.accounting_system.exception.ResourceAlreadyExistsException;
import com.vacom.accounting_system.exception.ResourceNotFoundException;
import com.vacom.accounting_system.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
//import jakarta.xml.bind.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import com.vacom.accounting_system.exception.ValidationException;

@Service
@Transactional
public class VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private EntityRepository entityRepository;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private VoucherDetailRepository voucherDetailRepository;

    @Autowired
    private UserRepository userRepository;

    public VoucherResponseDTO createVoucher (VoucherDTO dto) {
        // Kiểm tra voucher_number đã tồn tại chưa
        if (voucherRepository.existsByVoucherNumber(dto.getVoucherNumber())) {
            throw new ResourceAlreadyExistsException("Mã phiếu đã tồn tại: " + dto.getVoucherNumber());
        }

        // Kiểm tra entity
        BusinessEntity entity = entityRepository.findByEntityCode(dto.getEntityCode())
                .orElseThrow(() -> new ResourceNotFoundException("Đối tượng", "mã đối tượng", dto.getEntityCode()));

        // Kiểm tra currency
        Currency currency = currencyRepository.findByCurrencyCode(dto.getCurrencyCode())
                .orElseThrow(() -> new ResourceNotFoundException("Loại tiền", "mã tiền", dto.getCurrencyCode()));

        // Calculate total from details
        double totalAmountOriginCheck = dto.getDetails().stream()
                .mapToDouble(VoucherDetailDTO::getAmount)
                .sum();

        // Validate that provided total matches calculated total
        if (Math.abs(dto.getTotalAmount() - totalAmountOriginCheck) > 0.01) {
            throw new ValidationException("Tổng tiền không khớp với chi tiết phiếu");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "tên đăng nhập", username));

        // Xác định loại phiếu
        String prefix = dto.getVoucherNumber().substring(0, 2);
        String voucherType = "";
        if (prefix.equals("PT")) {
            voucherType = "Phiếu thu";
        } else if (prefix.equals("PC")) {
            voucherType = "Phiếu chi";
        } else {
            voucherType = "Phiếu khác";
        }

        // Tính tổng số tiền và kiểm tra tài khoản
        double totalAmountOrigin = 0;
        for (VoucherDetailDTO detailDto : dto.getDetails()) {
            // Kiểm tra tài khoản nợ
            if (!accountRepository.existsByAccountCode(detailDto.getAccountDebitCode())) {
                throw new ResourceNotFoundException("Tài khoản nợ", "mã tài khoản", detailDto.getAccountDebitCode());
            }

            // Kiểm tra tài khoản có
            if (!accountRepository.existsByAccountCode(detailDto.getAccountCreditCode())) {
                throw new ResourceNotFoundException("Tài khoản có", "mã tài khoản", detailDto.getAccountCreditCode());
            }

            totalAmountOrigin += detailDto.getAmount();
        }

        // Tính tổng tiền quy đổi
        double totalAmount = totalAmountOrigin * currency.getExchangeRate();

        // Tạo voucher
        Voucher voucher = new Voucher();
        voucher.setVoucherNumber(dto.getVoucherNumber());
        voucher.setVoucherType(voucherType);
        voucher.setVoucherDate(dto.getVoucherDate());
        voucher.setDescription(dto.getDescription());
        voucher.setEntityCode(dto.getEntityCode());
        voucher.setCurrencyId(currency.getId());
        voucher.setExchangeRate(currency.getExchangeRate());
        voucher.setCreatedBy(Math.toIntExact(user.getId()));
        voucher.setTotalAmountOrigin(totalAmountOrigin);
        voucher.setTotalAmount(totalAmount);
        voucher.setPrinted(false);

        // Lưu voucher
        Voucher savedVoucher = voucherRepository.save(voucher);

        // Lưu chi tiết voucher
        List<VoucherDetail> details = dto.getDetails().stream().map(detailDto -> {
            Account debitAccount = accountRepository.findByAccountCode(detailDto.getAccountDebitCode())
                    .orElseThrow(() -> new ResourceNotFoundException("Tài khoản nợ", "mã tài khoản", detailDto.getAccountDebitCode()));

            Account creditAccount = accountRepository.findByAccountCode(detailDto.getAccountCreditCode())
                    .orElseThrow(() -> new ResourceNotFoundException("Tài khoản có", "mã tài khoản", detailDto.getAccountCreditCode()));

            VoucherDetail detail = new VoucherDetail();
            detail.setVoucher(savedVoucher);
            detail.setAccountDebit(debitAccount);
            detail.setAccountCredit(creditAccount);
            detail.setAmount(detailDto.getAmount());
            detail.setDescription(detailDto.getDescription());
            return detail;
        }).collect(Collectors.toList());

        voucherDetailRepository.saveAll(details);

        return mapToResponseDTO(savedVoucher, entity, currency);
    }

    public void deleteVoucher(Integer voucherId) {
        // Delete details first
        voucherDetailRepository.deleteByVoucher_Id(voucherId);
        voucherRepository.deleteById(voucherId);
    }

    private VoucherResponseDTO mapToResponseDTO(Voucher voucher, BusinessEntity entity, Currency currency) {
        VoucherResponseDTO response = new VoucherResponseDTO();
        response.setId(voucher.getId());
        response.setVoucherNumber(voucher.getVoucherNumber());
        response.setEntityCode(voucher.getEntityCode());
        response.setEntityName(entity.getEntityName());
        response.setVoucherDate(voucher.getVoucherDate());
        response.setCurrentCode(currency.getCurrencyCode());
        response.setTotalAmount(voucher.getTotalAmount());
        response.setTotalAmountOrigin(voucher.getTotalAmountOrigin());
        response.setVoucherType(voucher.getVoucherType());
        return response;
    }

    public Page<VoucherResponseDTO> getAllVouchers(Pageable pageable) {
        Page<Voucher> voucherPage = voucherRepository.findAll(pageable);

        return voucherPage.map(voucher -> {
            BusinessEntity entity = entityRepository.findByEntityCode(voucher.getEntityCode())
                    .orElseThrow(() -> new EntityReferenceNotFoundException("đối tượng", voucher.getEntityCode()));

            Currency currency = currencyRepository.findById(voucher.getCurrencyId())
                    .orElseThrow(() -> new EntityReferenceNotFoundException("loại tiền", voucher.getCurrencyId().toString()));

            VoucherResponseDTO response = mapToResponseDTO(voucher, entity, currency);

            List<VoucherDetail> details = voucherDetailRepository.findByVoucherId(voucher.getId());

            List<VoucherDetailResponseDTO> detailDTOs = details.stream().map(detail -> {
                VoucherDetailResponseDTO detailDTO = new VoucherDetailResponseDTO();
                detailDTO.setAccountDebitCode(detail.getAccountDebit().getAccountCode());
                detailDTO.setAccountCreditCode(detail.getAccountCredit().getAccountCode());
                detailDTO.setAmount(detail.getAmount());
                detailDTO.setId(detail.getId());
                return detailDTO;
            }).collect(Collectors.toList());

            // Thêm chi tiết vào response
            response.setDetails(detailDTOs);

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new ResourceNotFoundException("Người dùng", "tên đăng nhập", authentication.getName()));
            response.setCreateBy(user.getFullName());

            return response;
        });
    }
}