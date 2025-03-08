import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table, Alert, Pagination, Modal} from "react-bootstrap";
import { FaSyncAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../libs/axios-client";
import PropTypes from "prop-types";
import TemplateAccountDetailReport from "./TemplateAccountDetailReport"
import ExportButton from "./ExcelAccountDetailReport";
import Select from 'react-select';


const sortvoucherNumber = (data) => {
  const sortedData = [...data];
  
  const isParentOf = (parent, child) => {
    return child.voucherNumber.startsWith(parent.voucherNumber) && 
           child.voucherNumber.length > parent.voucherNumber.length;
  };
  
  sortedData.sort((a, b) => {
    if (isParentOf(a, b)) return -1;
    
    if (isParentOf(b, a)) return 1;
    
    return a.voucherNumber.localeCompare(b.voucherNumber);
  });
  
  return sortedData;
};

const ReportPage = (initialData) => {
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [accountCodes, setAccountCodes] = useState([]);
  const [filterText, setFilterText] = useState("Hiển thị tất cả dữ liệu");
  const [show, setShow] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [showModalSelectAccount, setShowModalSelectAccount] = useState(false);

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20; // Số bản ghi mỗi trang

  useEffect(() => {
    fetchData(); // Gọi API ngay khi vào trang
}, [currentPage]); // Chỉ phụ thuộc vào currentPage, không phụ thuộc vào startDate và endDate
 
  
  const handleExport = () => {
    setShow(true);

    setTimeout(() => {
      const printButton = document.querySelector('#print');
      if (printButton) {
        printButton.click();
      }
    }, 100);
  };

  const fetchData = async () => {
    try {
      let url = `/reports/account-ledger?page=${currentPage}&size=${pageSize}`;
  
      // Nếu có ngày bắt đầu và ngày kết thúc, thêm vào URL
      if (startDate && endDate && startDate <= endDate) {
        url += `&startDate=${startDate.toISOString().split("T")[0]}&endDate=${endDate.toISOString().split("T")[0]}`;
      }
  
      // Nếu có loại tài khoản đối ứng được chọn, thêm vào URL
      if (accountCodes.length > 0) {
        const accountFilter = accountCodes.map((item) => item.value).join(",");
        url += `&counterAccountCodes=${accountFilter}`; // Sử dụng `counterAccountCodes` thay vì `accountCodes`
      }
  
      const res = await axiosClient.get(url);
      let data = res.data?.content || [];
  
      // Sắp xếp dữ liệu theo ngày
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      setFormData(sortvoucherNumber(data));
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể lấy dữ liệu. Vui lòng thử lại!");
    }
  };  

  const handleFilter = () => {
    setError("");
  
    if (!startDate || !endDate) {
      setError("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.");
      return;
    }
  
    if (startDate > endDate) {
      setError("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
      return;
    }
  
    let filterMessage = `Lọc từ ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()}`;
  
    if (accountCodes.length > 0) {
      filterMessage += ` | Tài khoản đối ứng: ${accountCodes.map(a => a.label).join(", ")}`;
    }
  
    setFilterText(filterMessage);
  
    // Đặt lại trang đầu tiên rồi mới fetch dữ liệu với các điều kiện
    setCurrentPage(0);
    fetchData();
  };
  
  const handleSelectAccount = async () => {
    if(accounts.length == 0){
      await axiosClient.get('/master-data/accounts')
      .then(res => {
        setAccounts(res.data);
      });
    }

    setShowModalSelectAccount(true);
  }
  return (
    <Container fluid className="p-3">
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs="auto">
          <h5 className="m-0 fw-bold text-dark">Báo cáo chi tiết tài khoản</h5>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <ExportButton data={formData} />
          <Button variant="info" size="sm" onClick={handleExport}>In</Button>
          {show && <TemplateAccountDetailReport data={formData} setShow={setShow} /> }
          <Button variant="warning" size="sm" onClick={() => window.location.reload()}>
            <FaSyncAlt />
          </Button>
        </Col>
      </Row>

      {/* Bộ lọc thời gian */}
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Chọn ngày bắt đầu"
            popperPlacement="bottom-start"
          />
        </Col>
        <Col xs="auto">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Chọn ngày kết thúc"
            popperPlacement="bottom-start"
          />
        </Col>
        <Col xs="auto">
          <Alert variant="info" className="m-0" onClick={handleSelectAccount} style={{ cursor: "pointer" }}>
            {accountCodes.map((item) => item.value).join(", ")}
            {accountCodes.length == 0 && "Chọn tài khoản"}
          </Alert>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleFilter}>Lọc</Button>
        </Col>
      </Row>

      {/* Hiển thị lỗi */}
      {error && (
        <Row className="mb-2">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {/* Thông tin tham số */}
      <Row className="mb-3">
        <Col>
          <Alert variant="secondary" className="m-0">{filterText}</Alert>
        </Col>
      </Row>

      {/* Bảng dữ liệu */}
      <Table bordered hover className="table text-center">
        <thead className="table-primary bg-primary text-white">
          <tr>
            <th>#</th>
            <th>Ngày chứng từ</th>
            <th>Mã chứng từ</th>
            <th>Mô tả</th>
            <th>Tài khoản đối ứng</th>
            <th>Số dư nợ</th>
            <th>Số dư có</th>
            <th>Tổng dư nợ</th>
            <th>Tổng dư có</th>
          </tr>
        </thead>
        <tbody>
          {formData.length > 0 ? (
            formData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1 + currentPage * pageSize}</td>
                <td>{item.date ? new Date(item.date).toLocaleDateString('vi-VN') : ''}</td>
                <td>{item.voucherNumber}</td>
                <td>{item.description}</td>
                <td>{item.oppositeAccount}</td>
                <td>{item.debitAmount.toLocaleString()}</td>
                <td>{item.creditAmount.toLocaleString()}</td>
                <td>{item.debitBalance.toLocaleString()}</td>
                <td>{item.creditBalance.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal centered show={showModalSelectAccount} onHide={() => setShowModalSelectAccount(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            options={accounts.map((item) => ({ value: item.accountCode, label: `${item.accountName}` }))}
            onChange={(selected) => setAccountCodes(selected)}
            isMulti
            value={accountCodes}
            placeholder="Chọn tài khoản"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalSelectAccount(false)}>Đóng</Button>
          <Button variant="primary" onClick={() => setShowModalSelectAccount(false)}>Chọn</Button>
        </Modal.Footer>        
      </Modal>

      {/* Phân trang */}
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => setCurrentPage(0)} disabled={currentPage === 0} />
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0} />
        <Pagination.Item>{currentPage + 1} / {totalPages}</Pagination.Item>
        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage === totalPages - 1} />
      </Pagination>
    </Container>
  );
};

ReportPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    date: PropTypes.string,
    voucherNumber: PropTypes.string,
    description: PropTypes.string,
    oppositeAccount: PropTypes.string,
    debitAmount: PropTypes.string,
    creditAmount: PropTypes.string,    
    debitBalance: PropTypes.string,
    creditBalance: PropTypes.string,
  }),
};

export default ReportPage;
