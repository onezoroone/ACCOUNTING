import React, { useEffect, useState } from "react"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, Row, Col, Table, Alert } from "react-bootstrap";
import { FaSyncAlt } from "react-icons/fa";
import axiosClient from "../libs/axios-client";

interface TrialBalanceReport {
  id: number;
  accountCode: string;
  accountName: string;
  debitOpening: number;
  creditOpening: number;
  debitTransaction: number;
  creditTransaction: number;
  debitClosing: number;
  creditClosing: number;
}

function ReportPage(){
  const [data, setData] = useState<TrialBalanceReport[]>([]);
  const [currentPagination, setCurrentPagination] = useState(0);
  const [totalPagination, setTotalPagination] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterText, setFilterText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPagination]);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/reports/trial-balance", {
        params: {
          page: currentPagination,
          startDate: startDate ? startDate.toISOString().split("T")[0] : undefined,
          endDate: endDate ? endDate.toISOString().split("T")[0] : undefined,
        }
      });
      setData(res.data.content);
      setTotalPagination(res.data.totalPages);
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
    fetchData();
  };

  return (
    <Container fluid className="p-3">
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs="auto">
          <h5 className="m-0 fw-bold text-dark">Báo cáo sổ cân đối phát sinh</h5>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button variant="success" size="sm">Xuất</Button>
          <Button variant="info" size="sm">In</Button>
          <Button variant="warning" size="sm" onClick={fetchData}><FaSyncAlt /></Button>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Chọn ngày bắt đầu"
          />
        </Col>
        <Col xs="auto">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Chọn ngày kết thúc"
          />
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleFilter}>Lọc</Button>
        </Col>
      </Row>

      {error && (
        <Row className="mb-2">
          <Col><Alert variant="danger">{error}</Alert></Col>
        </Row>
      )}

      <Row className="mb-3">
        <Col>
          <Alert variant="secondary" className="m-0">{filterText}</Alert>
        </Col>
      </Row>

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
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.accountCode}</td>
                <td>{item.accountName}</td>
                <td>{item.debitOpening}</td>
                <td>{item.creditOpening}</td>
                <td>{item.debitTransaction}</td>
                <td>{item.creditTransaction}</td>
                <td>{item.debitClosing}</td>
                <td>{item.creditClosing}</td>
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
}

export default ReportPage;
