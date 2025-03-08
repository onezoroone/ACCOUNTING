import { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import PartnersModal from "./PartnersModal";
import { Link, useLocation } from "react-router-dom";

const ReceiptVoucher = () => {
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  const [voucher, setVoucher] = useState(data);
  console.log(voucher);
  const [entries, setEntries] = useState([
    { account_debit: "", account_credit: "", amount: "", entity_code: "", entity_name: "", description: "" }
  ]);

  const addRow = () => {
    setEntries([...entries, { account_debit: "", account_credit: "", amount: "", entity_code: "", entity_name: "", description: "" }]);
  };

  const deleteRow = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setEntries([]);
  };

  const [isPartnersModalOpen, setPartnersModalOpen] = useState(false);

  return (
    <div className="container-fluid mt-4">
      <h4 className="text-center">PHIẾU THU</h4>
      
      <div className="row bg-light p-3 rounded">
        <div className="col-md-4">
          <label>Mã đối tượng</label>
          <input type="text" name="entity_code" />
          <button onClick={() => setPartnersModalOpen(true)}>+</button>
          <PartnersModal isOpen={isPartnersModalOpen} onClose={() => setPartnersModalOpen(false)} />
        </div>
        <div className="col-md-4">
          <label>Tên đối tượng</label>
          <Form.Control type="text" name="entity_name" />
        </div>
        <div className="col-md-4">
          <label>Ngày chứng từ</label>
          <Form.Control type="date" name="voucher_date" />
        </div>

        <div className="col-md-4 mt-2">
          <label>Ông bà</label>
          <Form.Control type="text" name="contact_person" />
        </div>
        <div className="col-md-4 mt-2">
          <label>Địa chỉ</label>
          <Form.Control type="text" name="address" />
        </div>
        <div className="col-md-4 mt-2">
          <label>Số chứng từ</label>
          <Form.Control type="text" name="voucher_number" />
        </div>

        <div className="col-md-4 mt-2">
          <label>Diễn giải</label>
          <Form.Control type="text" name="description" />
        </div>
        <div className="col-md-4 mt-2">
          <label>Mã NT</label>
          <Form.Control type="text" name="currency_id" />
        </div>
        <div className="col-md-2 mt-2">
          <label>VND</label>
          <Form.Control type="text" value="VND" disabled />
        </div>
        <div className="col-md-2 mt-2">
          <label>Tỷ giá</label>
          <Form.Control type="number" name="exchange_rate" />
        </div>
      </div>

      <h5 className="mt-4">Hạch toán</h5>
      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Tài khoản nợ</th>
            <th>Tài khoản có</th>
            <th>Số tiền</th>
            <th>Đối tượng</th>
            <th>Tên đối tượng</th>
            <th>Diễn giải chi tiết</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><Form.Control type="text" value={entry.account_debit} /></td>
              <td><Form.Control type="text" value={entry.account_credit} /></td>
              <td><Form.Control type="number" value={entry.amount} /></td>
              <td><Form.Control type="text" value={entry.entity_code} /></td>
              <td><Form.Control type="text" value={entry.entity_name} /></td>
              <td><Form.Control type="text" value={entry.description} /></td>
              <td>
                <button className="btn btn-sm" onClick={() => deleteRow(index)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="row">
        <div className="col-md-6">
          <Button className="bg-primary-subtle text-dark me-2" onClick={addRow}>Thêm dòng</Button>
          <Button className="bg-danger-subtle text-dark border-danger-subtle" onClick={clearAll}>Xóa tất cả</Button>
        </div>
        <div className="col-md-6 text-end">
          <div className="d-flex justify-content-end align-items-center">
            <label className="me-2">Tổng tiền:</label>
            <Form.Control type="number" className="w-25" readOnly />
          </div>
          <div className="d-flex justify-content-end align-items-center mt-2">
            <label className="me-2">Tổng tiền NT:</label>
            <Form.Control type="number" className="w-25" readOnly />
          </div>
        </div>
      </div>

      <div className="text-end mt-3">
        <Button className="bg-success-subtle text-dark border-success-subtle me-2">Lưu</Button>
        <Button className="bg-warning-subtle text-dark me-2 border-warning-subtle">Lưu và In</Button>
        <Link to="/vouchers">
          <Button variant="secondary">Đóng</Button>
        </Link>
      </div>
    </div>
  );
};

export default ReceiptVoucher;
