package com.vacom.accounting_system.service;

import com.vacom.accounting_system.dto.DashboardDTO;
import com.vacom.accounting_system.dto.MonthlyTransactionDTO;
import com.vacom.accounting_system.dto.YearlyRevenueDTO;
import com.vacom.accounting_system.entity.VoucherDetail;
import com.vacom.accounting_system.repository.AccountRepository;
import com.vacom.accounting_system.repository.VoucherDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AccountRepository accountRepository;
    private final VoucherDetailRepository voucherDetailRepository;

    private static final String CASH_ACCOUNT_PREFIX = "111";       // Tiền mặt
    private static final String BANK_ACCOUNT_PREFIX = "112";       // Tiền gửi ngân hàng
    private static final String RECEIVABLE_ACCOUNT_PREFIX = "131"; // Phải thu khách hàng
    private static final String PAYABLE_ACCOUNT_PREFIX = "331";    // Phải trả nhà cung cấp

    public DashboardDTO getDashboardData() {
        DashboardDTO dashboardDTO = new DashboardDTO();

        // Lấy dữ liệu từ số dư các tài khoản
        dashboardDTO.setTotalCash(calculateAccountBalance(CASH_ACCOUNT_PREFIX));
        dashboardDTO.setTotalBankDeposit(calculateAccountBalance(BANK_ACCOUNT_PREFIX));
        dashboardDTO.setTotalReceivable(calculateAccountBalance(RECEIVABLE_ACCOUNT_PREFIX));
        dashboardDTO.setTotalPayable(calculateAccountBalance(PAYABLE_ACCOUNT_PREFIX));

        // Lấy năm hiện tại
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        // Lấy dữ liệu thu chi theo tháng cho năm hiện tại
        dashboardDTO.setMonthlyTransactions(getMonthlyTransactions(currentYear));

        // Lấy dữ liệu tổng doanh thu theo năm (từ 5 năm trước đến năm hiện tại)
        dashboardDTO.setYearlyRevenue(getYearlyRevenue(currentYear - 5, currentYear));

        return dashboardDTO;
    }

    private Double calculateAccountBalance(String accountPrefix) {
        System.out.println("===== TÍNH TOÁN SỐ DƯ CHO TÀI KHOẢN: " + accountPrefix + " =====");

        // Bước 1: Lấy tất cả tài khoản có mã bắt đầu bằng prefix
        List<String> accountCodes = accountRepository.findByAccountCodeStartingWith(accountPrefix)
                .stream()
                .map(account -> account.getAccountCode())
                .collect(Collectors.toList());

        System.out.println("Tìm thấy " + accountCodes.size() + " tài khoản với tiền tố " + accountPrefix + ": " + accountCodes);

        if (accountCodes.isEmpty()) {
            System.out.println("Không tìm thấy tài khoản. Trả về 0.0");
            return 0.0;
        }

        // Bước 2: Lấy tất cả bút toán liên quan đến các tài khoản này
        List<VoucherDetail> details = voucherDetailRepository.findByAccountDebitAccountCodeInOrAccountCreditAccountCodeIn(
                accountCodes, accountCodes);

        System.out.println("Tìm thấy " + details.size() + " bút toán liên quan");

        // Bước 3: Tính tổng tiền nợ (debit)
        double totalDebit = 0.0;
        for (VoucherDetail detail : details) {
            if (accountCodes.contains(detail.getAccountDebit().getAccountCode())) {
                totalDebit += detail.getAmount();
                System.out.println("NỢ: " + detail.getAmount() + " | TK Nợ: " +
                        detail.getAccountDebit().getAccountCode() + " | TK Có: " +
                        detail.getAccountCredit().getAccountCode() + " | Ngày: " +
                        detail.getVoucher().getVoucherDate());
            }
        }
        System.out.println("Tổng tiền NỢ: " + totalDebit);

        // Bước 4: Tính tổng tiền có (credit)
        double totalCredit = 0.0;
        for (VoucherDetail detail : details) {
            if (accountCodes.contains(detail.getAccountCredit().getAccountCode())) {
                totalCredit += detail.getAmount();
                System.out.println("CÓ: " + detail.getAmount() + " | TK Nợ: " +
                        detail.getAccountDebit().getAccountCode() + " | TK Có: " +
                        detail.getAccountCredit().getAccountCode() + " | Ngày: " +
                        detail.getVoucher().getVoucherDate());
            }
        }
        System.out.println("Tổng tiền CÓ: " + totalCredit);

        // Bước 5: Tính số dư cuối cùng (totalDebit - totalCredit)
        double balance = totalDebit - totalCredit;
        System.out.println("SỐ DƯ CUỐI CÙNG: " + balance);

        return balance;
    }

    private List<MonthlyTransactionDTO> getMonthlyTransactions(int year) {
        System.out.println("===== TÍNH THU CHI THEO THÁNG CHO NĂM: " + year + " =====");

        // Bước 1: Lấy khoảng thời gian của năm
        Date startOfYear = getStartOfYear(year);
        Date endOfYear = getEndOfYear(year);
        System.out.println("Khoảng thời gian: " + startOfYear + " đến " + endOfYear);

        // Bước 2: Lấy tất cả bút toán trong năm
        List<VoucherDetail> yearTransactions = voucherDetailRepository
                .findByVoucherVoucherDateBetween(startOfYear, endOfYear);
        System.out.println("Tìm thấy " + yearTransactions.size() + " bút toán trong năm " + year);

        // Bước 3: Khởi tạo dữ liệu cho tất cả các tháng trong năm
        Map<String, MonthlyTransactionDTO> monthlyData = initializeAllMonths(year);
        System.out.println("Đã khởi tạo " + monthlyData.size() + " tháng với giá trị 0");
        SimpleDateFormat monthFormat = new SimpleDateFormat("MM/yyyy");

        // Bước 4: Xử lý từng giao dịch
        for (VoucherDetail detail : yearTransactions) {
            if (detail.getVoucher() == null || detail.getVoucher().getVoucherDate() == null) {
                System.out.println("Bỏ qua giao dịch thiếu thông tin voucher hoặc ngày");
                continue;
            }

            String month = monthFormat.format(detail.getVoucher().getVoucherDate());
            MonthlyTransactionDTO monthData = monthlyData.get(month);

            if (monthData == null) {
                System.out.println("Bỏ qua giao dịch không tìm thấy tháng: " + month);
                continue;
            }

            System.out.println("Xử lý giao dịch tháng " + month + ": Số tiền=" + detail.getAmount() + " | ID=" + detail.getId());

            // Phân loại thu chi dựa trên các mã tài khoản
            String debitCode = detail.getAccountDebit().getAccountCode();
            String creditCode = detail.getAccountCredit().getAccountCode();
            System.out.println("  TK Nợ: " + debitCode + " | TK Có: " + creditCode);

            double oldIncome = monthData.getIncome();
            double oldExpense = monthData.getExpense();

            // Thu: Ghi có TK doanh thu (51x) hoặc ghi nợ TK nợ phải thu (13x)
            if (creditCode.startsWith("51")) {
                monthData.setIncome(monthData.getIncome() + detail.getAmount());
                System.out.println("  TĂNG THU: " + detail.getAmount() + " (TK có 51x) => Thu mới: " + monthData.getIncome());
            } else if (debitCode.startsWith("13")) {
                monthData.setIncome(monthData.getIncome() + detail.getAmount());
                System.out.println("  TĂNG THU: " + detail.getAmount() + " (TK nợ 13x) => Thu mới: " + monthData.getIncome());
            }

            // Chi: Ghi nợ TK chi phí (6xx, 8xx) hoặc ghi có TK phải trả (33x)
            if (debitCode.startsWith("6") || debitCode.startsWith("8")) {
                monthData.setExpense(monthData.getExpense() + detail.getAmount());
                System.out.println("  TĂNG CHI: " + detail.getAmount() + " (TK nợ 6xx/8xx) => Chi mới: " + monthData.getExpense());
            } else if (creditCode.startsWith("33")) {
                monthData.setExpense(monthData.getExpense() + detail.getAmount());
                System.out.println("  TĂNG CHI: " + detail.getAmount() + " (TK có 33x) => Chi mới: " + monthData.getExpense());
            }

            // Kiểm tra nếu không có thay đổi
            if (oldIncome == monthData.getIncome() && oldExpense == monthData.getExpense()) {
                System.out.println("  KHÔNG THAY ĐỔI: Giao dịch không được tính vào thu chi");
            }
        }

        // Bước 5: Tóm tắt kết quả theo tháng
        System.out.println("\n===== TÓM TẮT THU CHI THEO THÁNG =====");
        for (Map.Entry<String, MonthlyTransactionDTO> entry : monthlyData.entrySet()) {
            MonthlyTransactionDTO data = entry.getValue();
            System.out.println("Tháng " + entry.getKey() + ": Thu=" + data.getIncome() + ", Chi=" + data.getExpense());
        }

        // Sắp xếp theo tháng
        List<MonthlyTransactionDTO> result = monthlyData.values().stream()
                .sorted(Comparator.comparing(MonthlyTransactionDTO::getMonth))
                .collect(Collectors.toList());

        System.out.println("===== KẾT THÚC TÍNH THU CHI =====\n");
        return result;
    }

    private List<YearlyRevenueDTO> getYearlyRevenue(int startYear, int endYear) {
        List<YearlyRevenueDTO> result = new ArrayList<>();

        // Tạo danh sách các năm và khởi tạo doanh thu bằng 0
        for (int year = startYear; year <= endYear; year++) {
            result.add(new YearlyRevenueDTO(year, 0.0));
        }

        // Lấy dữ liệu từ startYear đến endYear
        Date startDate = getStartOfYear(startYear);
        Date endDate = getEndOfYear(endYear);

        List<VoucherDetail> allTransactions = voucherDetailRepository
                .findByVoucherVoucherDateBetween(startDate, endDate);

        // Tạo map để dễ dàng cập nhật doanh thu theo năm
        Map<Integer, Double> revenueByYear = new HashMap<>();
        for (int year = startYear; year <= endYear; year++) {
            revenueByYear.put(year, 0.0);
        }

        // Tính tổng doanh thu cho mỗi năm
        Calendar calendar = Calendar.getInstance();
        for (VoucherDetail detail : allTransactions) {
            if (detail.getVoucher() == null || detail.getVoucher().getVoucherDate() == null) {
                continue;
            }

            // Lấy năm của giao dịch
            calendar.setTime(detail.getVoucher().getVoucherDate());
            int transactionYear = calendar.get(Calendar.YEAR);

            // Kiểm tra xem năm có trong phạm vi không
            if (!revenueByYear.containsKey(transactionYear)) {
                continue;
            }

            String debitCode = detail.getAccountDebit().getAccountCode();
            String creditCode = detail.getAccountCredit().getAccountCode();

            // Mở rộng điều kiện tính doanh thu
            if (creditCode.startsWith("51") ||
                    creditCode.startsWith("52") ||
                    creditCode.startsWith("5") ||
                    debitCode.startsWith("511")) {
                revenueByYear.put(transactionYear, revenueByYear.get(transactionYear) + detail.getAmount());
            }
        }

        // Cập nhật kết quả
        for (YearlyRevenueDTO yearData : result) {
            yearData.setTotalRevenue(revenueByYear.get(yearData.getYear()));
        }

        return result;
    }

    private Map<String, MonthlyTransactionDTO> initializeAllMonths(int year) {
        Map<String, MonthlyTransactionDTO> monthlyData = new HashMap<>();
        SimpleDateFormat monthFormat = new SimpleDateFormat("MM/yyyy");

        // Tạo dữ liệu cho tất cả các tháng trong năm
        for (int month = 0; month < 12; month++) {
            Calendar cal = Calendar.getInstance();
            cal.set(year, month, 1);
            String monthKey = monthFormat.format(cal.getTime());
            monthlyData.put(monthKey, new MonthlyTransactionDTO(monthKey, 0.0, 0.0));
        }

        return monthlyData;
    }

    private Date getStartOfYear(int year) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, Calendar.JANUARY, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    private Date getEndOfYear(int year) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, Calendar.DECEMBER, 31, 23, 59, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }
}