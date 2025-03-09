import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Import axios để gọi API
import voucherService from '../services/OtherVoucherService'; // Import service
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate để chuyển hướng

const OtherVoucher = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [entries, setEntries] = useState([
    { account_debit: "", account_credit: "", amount: "", entity_code: "", entity_name: "", description: "" }
  ]);

  const [formData, setFormData] = useState({
    entity_code: '',
    entity_name: '',
    voucher_date: '',
    contact_person: '',
    address: '',
    voucher_number: '',
    description: '',
    currency_id: '',
    exchange_rate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý thêm chứng từ
  const handleSave = async () => {
    const voucherData = {
      ...formData,
      entries,
    };
  
    try {
      const response = await voucherService.createVoucher(voucherData);
      console.log('Voucher created:', response);
      alert('Lưu phiếu thành công!');
  
      // Chuyển hướng về VouchersPage với state để tải lại danh sách
      navigate('/vouchers', { state: { reload: true } });
    } catch (error) {
      console.error('Error creating voucher:', error);
      alert('Có lỗi xảy ra khi lưu phiếu!');
    }
  };

  const addRow = () => {
    setEntries([...entries, { account_debit: "", account_credit: "", amount: "", entity_code: "", entity_name: "", description: "" }]);
  };

  const deleteRow = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setEntries([]);
  };

  return (
    <div className="container-fluid mt-4">
      <h4 className="text-center">PHIẾU KẾ TOÁN KHÁC</h4>
      
      <div className="row bg-light p-3 rounded">
        <div className="col-md-4">
          <label>Mã đối tượng</label>
          <input type="text" name="entity_code" value={formData.entity_code} onChange={handleInputChange} />
        </div>
        <div className="col-md-4">
          <label>Tên đối tượng</label>
          <Form.Control type="text" name="entity_name" value={formData.entity_name} onChange={handleInputChange} />
        </div>
        <div className="col-md-4">
          <label>Ngày chứng từ</label>
          <Form.Control type="date" name="voucher_date" value={formData.voucher_date} onChange={handleInputChange} />
        </div>

        <div className="col-md-4 mt-2">
          <label>Ông bà</label>
          <Form.Control type="text" name="contact_person" value={formData.contact_person} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mt-2">
          <label>Địa chỉ</label>
          <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mt-2">
          <label>Số chứng từ</label>
          <Form.Control type="text" name="voucher_number" value={formData.voucher_number} onChange={handleInputChange} />
        </div>

        <div className="col-md-4 mt-2">
          <label>Diễn giải</label>
          <Form.Control type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mt-2">
          <label>Mã NT</label>
          <Form.Control type="text" name="currency_id" value={formData.currency_id} onChange={handleInputChange} />
        </div>
        <div className="col-md-2 mt-2">
          <label>VND</label>
          <Form.Control type="text" value="VND" disabled />
        </div>
        <div className="col-md-2 mt-2">
          <label>Tỷ giá</label>
          <Form.Control type="number" name="exchange_rate" value={formData.exchange_rate} onChange={handleInputChange} />
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
              <td><Form.Control type="text" value={entry.account_debit} onChange={(e) => {
                const newEntries = [...entries];
                newEntries[index].account_debit = e.target.value;
                setEntries(newEntries);
              }} /></td>
              <td><Form.Control type="text" value={entry.account_credit} onChange={(e) => {
                const newEntries = [...entries];
                newEntries[index].account_credit = e.target.value;
                setEntries(newEntries);
              }} /></td>
              <td><Form.Control type="number" value={entry.amount} onChange={(e) => {
                const newEntries = [...entries];
                newEntries[index].amount = e.target.value;
                setEntries(newEntries);
              }} /></td>
              <td><Form.Control type="text" value={entry.entity_code} onChange={(e) => {
                const newEntries = [...entries];
                newEntries[index].entity_code = e.target.value;
                setEntries(newEntries);
              }} /></td>
              <td><Form.Control type="text" value={entry.entity_name} onChange={(e) => {
                const newEntries = [...entries];
                newEntries[index].entity_name = e.target.value;
                setEntries(newEntries);
              }} /></td>
              <td><Form.Control type="text" value={entry.description} onChange={(e) => {
                const newEntries = [...entries];
                newEntries[index].description = e.target.value;
                setEntries(newEntries);
              }} /></td>
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
        <Button className="bg-success-subtle text-dark border-success-subtle me-2" onClick={handleSave}>Lưu</Button>
        <Button className="bg-warning-subtle text-dark me-2 border-warning-subtle">Lưu và In</Button>
        <Button variant="secondary">Đóng</Button>
      </div>
    </div>
  );
};

export default OtherVoucher;