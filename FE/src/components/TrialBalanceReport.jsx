import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, Row, Col, Table, Alert } from "react-bootstrap";
import { FaSyncAlt } from "react-icons/fa";

const ReportPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterText, setFilterText] = useState("Chưa chọn thời gian");
  const [error, setError] = useState("");

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
  };

  return (
    <Container fluid className="p-3">
      {/* Thanh công cụ trên */}
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs="auto">
          <h5 className="m-0 fw-bold text-dark">Báo cáo sổ cân đối phát sinh</h5>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button variant="success" size="sm">Xuất</Button>
          <Button variant="info" size="sm">In</Button>
          <Button variant="warning" size="sm"><FaSyncAlt /></Button>
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
            <th>Mã tài khoản</th>
            <th>Tên tài khoản</th>
            <th>Số dư đầu kỳ</th>
            <th>TK nợ</th>
            <th>TK có</th>
            <th>Số dư cuối kỳ</th>
          </tr>
        </thead>
      </Table>
    </Container>
  );
};

export default ReportPage;
