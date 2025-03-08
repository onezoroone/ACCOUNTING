import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const exportToExcel = (tableData, fileName = 'so-can-doi-phat-sinh.xlsx') => {
    const headers = [
      ['Số hiệu TK', 'Tên tài khoản', 'Số dư đầu kỳ', 'Số dư đầu kỳ', 'Phát sinh trong kỳ', 'Phát sinh trong kỳ', 'Số dư cuối kỳ', 'Số dư cuối kỳ'],
      ['', '', 'Nợ', 'Có', 'Nợ', 'Có', 'Nợ', 'Có']
    ];
  
    const data = tableData.map(item => [
      item.accountCode,
      item.accountName,
      item.debitOpening,
      item.creditOpening,
      item.debitTransaction,
      item.creditTransaction,
      item.debitClosing,
      item.creditClosing
    ]);
  
    const excelData = [...headers, ...data];
  
    const workbook = XLSX.utils.book_new();
    
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
      { s: { r: 0, c: 2 }, e: { r: 0, c: 3 } },
      { s: { r: 0, c: 4 }, e: { r: 0, c: 5 } },
      { s: { r: 0, c: 6 }, e: { r: 0, c: 7 } }
    ];
    
    const numericColumns = [2, 3, 4, 5, 6, 7];
    for (let i = 2; i < excelData.length; i++) {
      for (const col of numericColumns) {
        if (worksheet[XLSX.utils.encode_cell({ r: i, c: col })]) {
          worksheet[XLSX.utils.encode_cell({ r: i, c: col })].t = 'n';
        }
      }
    }
    
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'center' }
    };
    
    const parentStyle = {
      font: { bold: true }
    };
    
    for (let i = 0; i < excelData.length; i++) {
      for (let j = 0; j < excelData[i].length; j++) {
        const cellRef = XLSX.utils.encode_cell({ r: i, c: j });
        if (!worksheet[cellRef]) continue;
        
        if (i < 2) {
          worksheet[cellRef].s = headerStyle;
        }
        else if (tableData[i - 2] && !tableData[i - 2].parentId) {
          worksheet[cellRef].s = parentStyle;
        }
      }
    }
    
    worksheet['!cols'] = [
      { wch: 10 },  // Số hiệu TK
      { wch: 30 },  // Tên tài khoản
      { wch: 15 },  // Số dư đầu kỳ - Nợ
      { wch: 15 },  // Số dư đầu kỳ - Có
      { wch: 15 },  // Phát sinh trong kỳ - Nợ
      { wch: 15 },  // Phát sinh trong kỳ - Có
      { wch: 15 },  // Số dư cuối kỳ - Nợ
      { wch: 15 }   // Số dư cuối kỳ - Có
    ];
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sổ cân đối phát sinh');
    
    XLSX.writeFile(workbook, fileName);
  };
  
const ExportButton = ({ data }) => {
    const handleExportClick = () => {
      exportToExcel(data);
    };
  
    return (
        <Button onClick={handleExportClick} variant="success" size="sm">Xuất</Button>
    );
};

ExportButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    accountCode: PropTypes.string,
    accountName: PropTypes.string,
    debitOpening: PropTypes.string,
    creditOpening: PropTypes.string,
    debitTransaction: PropTypes.string,
    creditTransaction: PropTypes.string,    
    debitClosing: PropTypes.string,
    creditClosing: PropTypes.string,
  }))
};
  
export default ExportButton;