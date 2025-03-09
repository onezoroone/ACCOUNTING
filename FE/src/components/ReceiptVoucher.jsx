import { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Select from 'react-select';
import axiosClient from "../libs/axios-client";

const ReceiptVoucher = () => {
  const location = useLocation();
  const data = location.state ? location.state.data : {
    "entityCode": "",
    "entityName": "",
    "voucherDate": "",
    "address": "",
    "voucherNumber": "",
    "description": "",
    "currencyCode": "",
    "exchangeRate": 1,
    "totalAmount": 0,
    "totalAmountOrigin": 0,
    "details": []
  };
  const [voucher, setVoucher] = useState(data);
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  
  const [entries, setEntries] = useState([
    { account_debit: "", account_credit: "", amount: "", entity_code: "", entity_name: "", description: "" }
  ]);

  const addRow = () => {
    setEntries([...entries, { account_debit: "", account_credit: "", amount: "", entity_code: "", entity_name: "", description: "" }]);
    setVoucher({ ...voucher, details: entries });
  };

  const deleteRow = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setEntries([]);
  };

  const [isPartnersModalOpen, setPartnersModalOpen] = useState(false);

  const handleGetEntities = async () => {
    if(entities.length === 0) {
      await axiosClient.get("/master-data/entities?size=10000")
      .then((res) => {
        setEntities(res.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
    }

    setPartnersModalOpen(true);
  };

  const handleChangeVoucher = (e) => {
    const { name, value } = e.target;
    setVoucher({ ...voucher, [name]: value });
  };

  const handleGetCurrency = async () => {
    if(currencies.length === 0) {
      await axiosClient.get("/master-data/currencies")
      .then((res) => {
        setCurrencies(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    }

    console.log(selectedCurrency);

    setCurrencyModalOpen(true);
  }

  return (
    <div className="container-fluid mt-4">
      <h4 className="text-center">PHIẾU THU</h4>
      
      <div className="row bg-light p-3 rounded">
        <div className="col-md-4">
          <label>Mã đối tượng</label>
          <div className="input-group mb-3">
            <input type="text" name="entity_code" className="form-control" value={voucher.entityCode} />
            <button onClick={handleGetEntities} className="btn btn-outline-secondary" type="button">+</button>
          </div>
          <Modal centered show={isPartnersModalOpen} onHide={() => setPartnersModalOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Chọn đối tượng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Select
                options={entities.map((item) => ({ value: item.entityCode, label: `${item.entityName}` }))}
                onChange={(selected) => setSelectedEntity(selected)}
                value={selectedEntity}
                placeholder="Chọn đối tượng"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setPartnersModalOpen(false)}>Đóng</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="col-md-4">
          <label>Tên đối tượng</label>
          <Form.Control type="text" name="entity_name" value={voucher.entityName} onChange={handleChangeVoucher} />
        </div>
        <div className="col-md-4">
          <label>Ngày chứng từ</label>
          <Form.Control type="date" name="voucher_date" value={voucher.voucherDate} onChange={handleChangeVoucher} />
        </div>

        <div className="col-md-4 mt-2">
          <label>Ông bà</label>
          <Form.Control type="text" name="contact_person" />
        </div>
        <div className="col-md-4 mt-2">
          <label>Địa chỉ</label>
          <Form.Control type="text" name="address" value={voucher.address} onChange={handleChangeVoucher} />
        </div>
        <div className="col-md-4 mt-2">
          <label>Số chứng từ</label>
          <Form.Control type="text" name="voucher_number" value={voucher.voucherNumber} onChange={handleChangeVoucher} />
        </div>

        <div className="col-md-4 mt-2">
          <label>Diễn giải</label>
          <Form.Control type="text" name="description" value={voucher.description} onChange={handleChangeVoucher} />
        </div>
        <div className="col-md-4 mt-2">
          <label>Mã NT</label>
          <div className="input-group ">
            <input type="text" name="currency_id" className="form-control" value={voucher.currencyCode} />
            <button onClick={handleGetCurrency} className="btn btn-outline-secondary" type="button">+</button>
          </div>
        </div>
        <Modal centered show={currencyModalOpen} onHide={() => setCurrencyModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chọn ngoại tệ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Select
              options={currencies.map((item) => ({ value: item.currencyCode, label: `${item.currencyName}`, exchangeRate: item.exchangeRate }))}
              onChange={(selected) => setSelectedCurrency(selected)}
              value={selectedCurrency}
              placeholder="Chọn ngoại tệ"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setCurrencyModalOpen(false)}>Đóng</Button>
          </Modal.Footer>
        </Modal>
        <div className="col-md-2 mt-2">
          <label>VND</label>
          <Form.Control type="text" value="VND" disabled />
        </div>
        <div className="col-md-2 mt-2">
          <label>Tỷ giá</label>
          <Form.Control type="number" name="exchange_rate" value={voucher.exchangeRate} onChange={handleChangeVoucher} />
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
          {voucher.details.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><Form.Control type="text" value={entry.accountDebitCode} /></td>
              <td><Form.Control type="text" value={entry.accountCreditCode} /></td>
              <td><Form.Control type="number" value={entry.amount} /></td>
              <td><Form.Control type="text" value={voucher.entityCode} /></td>
              <td><Form.Control type="text" value={voucher.entityName} /></td>
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
            <Form.Control type="number" className="w-25" readOnly value={voucher.totalAmount} />
          </div>
          <div className="d-flex justify-content-end align-items-center mt-2">
            <label className="me-2">Tổng tiền NT:</label>
            <Form.Control type="number" className="w-25" readOnly value={voucher.totalAmountOrigin} />
          </div>
        </div>
      </div>

      <div className="text-end mt-3">
        <Button className="bg-success-subtle text-dark border-success-subtle me-2">Lưu</Button>
        {/* <Button className="bg-warning-subtle text-dark me-2 border-warning-subtle">Lưu và In</Button> */}
        <Link to="/vouchers">
          <Button variant="secondary">Đóng</Button>
        </Link>
      </div>
    </div>
  );
};

export default ReceiptVoucher;
