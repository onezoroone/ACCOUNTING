import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table, Alert, Pagination } from "react-bootstrap";
import { FaSyncAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../libs/axios-client";
import PropTypes from "prop-types";

const ReportPage = ({ initialData }) => {
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterText, setFilterText] = useState("Hiển thị tất cả dữ liệu");

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số dòng trên mỗi trang

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (start = null, end = null) => {
    try {
      let url = "/reports/trial-balance";
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
      setCurrentPage(1); // Reset về trang đầu tiên sau khi lọc
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

    setFilterText(`Lọc từ ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()}`);
    fetchData(startDate, endDate);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = formData.slice(indexOfFirstItem, indexOfLastItem);

  // Tạo danh sách số trang
  const totalPages = Math.ceil(formData.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Container fluid className="p-3">
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs="auto">
          <h5 className="m-0 fw-bold text-dark">Báo cáo sổ cân đối phát sinh</h5>
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
            <th>Mã tài khoản</th>
            <th>Tên tài khoản</th>
            <th>Số dư nợ đầu kỳ</th>
            <th>Số dư có đầu kỳ</th>
            <th>Phát sinh nợ</th>
            <th>Phát sinh có</th>
            <th>Số dư nợ cuối kỳ</th>
            <th>Số dư có cuối kỳ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.accountCode}</td>
                <td>{item.accountName}</td>
                <td>{item.debitOpening.toLocaleString()}</td>
                <td>{item.creditOpening.toLocaleString()}</td>
                <td>{item.debitTransaction.toLocaleString()}</td>
                <td>{item.creditTransaction.toLocaleString()}</td>
                <td>{item.debitClosing.toLocaleString()}</td>
                <td>{item.creditClosing.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Phân trang */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default ReportPage;
