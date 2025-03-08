import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table, Alert } from "react-bootstrap";
import { FaSyncAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../libs/axios-client";
import PropTypes from "prop-types";

const ReportPage = (initialData) => {
    const [formData, setFormData] = useState(
      initialData || { date: "", voucherNumber: "",
        description: "", oppositeAccount: "",
        debitAmount: "", creditAmount: "",
        debitBalance: "", creditBalance: "",
                       }
    );  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterText, setFilterText] = useState("Hiển thị tất cả dữ liệu");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (start = null, end = null) => {
    try {
      let url = "/reports/account-ledger";
      if (start && end) {
        url += `?startDate=${start.toISOString().split("T")[0]}&endDate=${end.toISOString().split("T")[0]}`;
      }
      
      const res = await axiosClient.get(url);
      console.log("Dữ liệu API:", res.data);

      if (res.data && res.data.content) {
        setFormData(res.data.content);
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

    if (startDate > endDate) {
      setError("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.");
      return;
    }

    setFilterText(`Lọc từ ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()}`);
    fetchData(startDate, endDate);
  };

  return (
    <Container fluid className="p-3">
      {/* Thanh công cụ trên */}
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs="auto">
          <h5 className="m-0 fw-bold text-dark">Báo cáo chi tiết tài khoản</h5>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button variant="success" size="sm">Xuất</Button>
          <Button variant="info" size="sm">In</Button>
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
