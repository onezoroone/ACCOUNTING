import { useState } from "react";
import {
  Dropdown,
  DropdownButton,
  Button,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { FaSearch, FaSyncAlt } from "react-icons/fa";

const ReportPage = () => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("Chọn thời gian");

  return (
    <Container fluid className="p-3">
      {/* Thanh chức năng */}
      <Row className="mt-1 py-1 px-2 d-flex justify-content-end align-items-center">
        <Col xs="auto">
          <div className="d-flex align-items-center">
            {/* Ô tìm kiếm */}
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <FaSearch className="text-secondary" />
              </span>
              <input
                type="text"
                className="form-control border-0 bg-light"
                placeholder="Tìm kiếm..."
                style={{ width: "250px" }}
              />
            </div>
          </div>
        </Col>

        {/* Nút Xuất, In, Refresh */}
        <Col xs="auto" className="d-flex gap-1">
          <Button variant="success" size="sm">
            Xuất
          </Button>
          <Button variant="info" size="sm">
            In
          </Button>
          <Button variant="warning" size="sm">
            <FaSyncAlt />
          </Button>
        </Col>
      </Row>

      {/* Thanh tiêu đề */}
      <Row className="bg-info bg-opacity-50 p-3 align-items-center">
        <Col md={6}>
          <h5 className="m-0 fw-bold text-dark">Báo cáo sổ cân đối phát sinh</h5>
        </Col>
        <Col md={6} className="text-end">
          {/* Dropdown chọn tham số */}
          <DropdownButton
            id="dropdown-time-filter"
            title={selectedTimeFilter}
            onSelect={(eventKey) => setSelectedTimeFilter(eventKey)}
            variant="secondary"
            className="d-inline-block me-2"
          >
            <Dropdown.Item eventKey="Lọc theo ngày">Lọc theo ngày</Dropdown.Item>
            <Dropdown.Item eventKey="Lọc theo tháng">Lọc theo tháng</Dropdown.Item>
            <Dropdown.Item eventKey="Lọc theo năm">Lọc theo năm</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      {/* Phần thông tin tham số */}
      <Row className="mt-1 p-3" style={{ color: 'black' }}>
        <Col>
          Thông tin tham số: {selectedTimeFilter !== "Chọn thời gian" ? selectedTimeFilter : "Chưa chọn thời gian"}
        </Col>
      </Row>

      {/* Bảng dữ liệu */}
      <Row className="mt-3">
        <Col>
          <Table bordered hover className="table text-center">
            <thead className="table-primary bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Mã tài khoản</th>
                <th>Tên tài khoản</th>
                <th>Số dư đầu kỳ</th>
                <th>TK nợ</th>
                <th>TK có </th>
                <th>Số dư cuối kỳ</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportPage;
