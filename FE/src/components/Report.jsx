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
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("Chọn loại phiếu");

  return (
    <Container fluid className="p-3">
      {/* Thanh chức năng */}
      <Row className="mt-1 py-1 px-2 d-flex justify-content-end align-items-center">
        <Col xs="auto">
          <div className="d-flex align-items-center">
            {/* Ô tìm kiếm có icon */}
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
      <Row className="bg-light p-3 align-items-center">
        <Col md={6}>
          <h5 className="m-0 fw-bold">Báo cáo sổ cái</h5>
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

          <DropdownButton
            id="dropdown-type-filter"
            title={selectedTypeFilter}
            onSelect={(eventKey) => setSelectedTypeFilter(eventKey)}
            variant="secondary"
            className="d-inline-block"
          >
            <Dropdown.Item eventKey="Phiếu thu">Phiếu thu</Dropdown.Item>
            <Dropdown.Item eventKey="Phiếu chi">Phiếu chi</Dropdown.Item>
            <Dropdown.Item eventKey="Hạch toán khác">Hạch toán khác</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      {/* Phần thông tin tham số */}
      <Row className="mt-1 p-3 bg-primary text-white fw-bold">
        <Col>
          Thông tin tham số: {selectedTimeFilter !== "Chọn thời gian" ? selectedTimeFilter : "Chưa chọn thời gian"} - {selectedTypeFilter !== "Chọn loại phiếu" ? selectedTypeFilter : "Chưa chọn loại phiếu"}
        </Col>
      </Row>

      {/* Bảng dữ liệu */}
      <Row className="mt-3">
        <Col>
          <Table bordered hover className="table text-center">
            <thead className="table-primary bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Ngày tháng</th>
                <th>Mã chứng từ</th>
                <th>Diễn giải</th>
                <th>Số tiền nợ</th>
                <th>Số tiền có</th>
                <th>Số dư</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportPage;
