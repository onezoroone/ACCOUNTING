/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table, Alert, Modal } from "react-bootstrap";
import { FaSyncAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../libs/axios-client";
import PropTypes from "prop-types";
import TemplateAccountDetailReport from "./TemplateAccountDetailReport";
import Select from 'react-select';

const ReportPage = (initialData) => {
  const [formData, setFormData] = useState(
    initialData || { date: "", voucherNumber: "",
      description: "", oppositeAccount: "",
      debitAmount: "", creditAmount: "",
      debitBalance: "", creditBalance: "",
                      }
  );  
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [accountCodes, setAccountCodes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [show, setShow] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [showModalSelectAccount, setShowModalSelectAccount] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if(!startDate || !endDate || accountCodes.length == 0) {
      setError("Vui lòng chọn đầy đủ thông tin để lọc.");
      return;
    }
    setError("");

    try {
      
      const res = await axiosClient.get('/reports/account-ledger', {
        params: {
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          accountCodes: accountCodes.map((item) => item.value).join(","),
        },
      });

      if (res.data && res.data.data) {
        setFormData(res.data.data);
      } else {
        setFormData([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError("Không thể lấy dữ liệu. Vui lòng thử lại!");
    }
  };

  const handleFilter = () => {
    setError(""); // Reset lỗi trước khi lọc

    if (!startDate || !endDate) {
      setError("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.");
      return;
    }

    if (accountCodes.length == 0) {
      setError("Vui lòng chọn tài khoản cần lọc.");
      return;
    }

    if (startDate > endDate) {
      setError("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
      return;
    }

    setFilterText(`Lọc từ ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()} theo tài khoản ${accountCodes.map((item) => item.value).join(", ")}`);
    fetchData(startDate, endDate);
  };

  const handleExport = () => {
    setShow(true);

    // setTimeout(() => {
    //   const printButton = document.querySelector('#print');
    //   if (printButton) {
    //     printButton.click();
    //   }
    // }, 100);
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
      {/* Thanh công cụ trên */}
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs="auto">
          <h5 className="m-0 fw-bold text-dark">Báo cáo chi tiết tài khoản</h5>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button variant="success" size="sm">Xuất</Button>
          <Button variant="info" size="sm" onClick={handleExport}>In</Button>
          {show && <TemplateAccountDetailReport data={formData} setShow={setShow} startDate={startDate} endDate={endDate} accountCodes={accountCodes} />}
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

      {/* Hiển thị lỗi nếu có */}
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
                <td>{index + 1}</td>
                <td>{item.date}</td>
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
