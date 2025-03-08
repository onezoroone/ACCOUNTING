import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const exportToExcel = (tableData, fileName = 'so-chi-tiet-tai-khoan.xlsx') => {
    const headers = [
        ['Ngày chứng từ', 'Mã chứng từ', 'Mô tả', 'Tài khoản đối ứng', 'Số dư nợ', '', 'Tổng dư nợ', ''],
        ['', '', '', '', 'Nợ', 'Có', 'Nợ', 'Có']
    ];

    const data = tableData.map(item => [
         item.date ? new Date(item.date).toLocaleDateString('vi-VN') : '',  // Định dạng ngày
        item.voucherNumber,
        item.description,
        item.oppositeAccount,
        item.debitAmount,
        item.creditAmount,
        item.debitBalance,
        item.creditBalance
    ]);

    const excelData = [...headers, ...data];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);

    // Gộp ô tiêu đề
    worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
        { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
        { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },
        { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },
        { s: { r: 0, c: 4 }, e: { r: 0, c: 5 } },
        { s: { r: 0, c: 6 }, e: { r: 0, c: 7 } }
    ];

    // Căn chỉnh cột
    worksheet['!cols'] = [
        { wch: 15 }, // Ngày chứng từ
        { wch: 20 }, // Mã chứng từ
        { wch: 40 }, // Mô tả
        { wch: 15 }, // Tài khoản đối ứng
        { wch: 15 }, // Số dư nợ (Nợ)
        { wch: 15 }, // Số dư nợ (Có)
        { wch: 15 }, // Tổng dư nợ (Nợ)
        { wch: 15 }  // Tổng dư nợ (Có)
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sổ chi tiết tài khoản');
    XLSX.writeFile(workbook, fileName);
};

const ExportButton = ({ data }) => {
    const handleExportClick = () => {
        exportToExcel(data);
    };
    return <Button onClick={handleExportClick} variant="success" size="sm">Xuất</Button>;
};

ExportButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string,
        voucherNumber: PropTypes.string,
        description: PropTypes.string,
        oppositeAccount: PropTypes.string,
        debitAmount: PropTypes.number,
        creditAmount: PropTypes.number,
        debitBalance: PropTypes.number,
        creditBalance: PropTypes.number
    }))
};

export default ExportButton;
