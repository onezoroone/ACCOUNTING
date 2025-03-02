import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const CurrenciesTable = () => {
  const [currencies, setCurrencies] = useState([
    { id: 1, currency_code: "USD", currency_name: "US Dollar", exchange_rate: 1.0 },
    { id: 2, currency_code: "EUR", currency_name: "Euro", exchange_rate: 0.85 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const handleShow = (currency = null) => {
    setEditData(currency);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newCurrency = {
      id: editData ? editData.id : currencies.length + 1,
      currency_code: formData.get("currency_code"),
      currency_name: formData.get("currency_name"),
      exchange_rate: parseFloat(formData.get("exchange_rate")),
    };
    
    if (editData) {
      setCurrencies(currencies.map((c) => (c.id === editData.id ? newCurrency : c)));
    } else {
      setCurrencies([...currencies, newCurrency]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setCurrencies(currencies.filter((c) => c.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Bảng Tiền Tệ</h2>
      <Button variant="primary" onClick={() => handleShow()}>Thêm Tiền Tệ</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mã Tiền Tệ</th>
            <th>Tên Tiền Tệ</th>
            <th>Tỷ Giá</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.id}>
              <td>{currency.id}</td>
              <td>{currency.currency_code}</td>
              <td>{currency.currency_name}</td>
              <td>{currency.exchange_rate.toFixed(6)}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(currency)} className="me-2">Sửa</Button>
                <Button variant="danger" onClick={() => handleDelete(currency.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Chỉnh sửa Tiền Tệ" : "Thêm Tiền Tệ"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group>
              <Form.Label>Mã Tiền Tệ</Form.Label>
              <Form.Control type="text" name="currency_code" defaultValue={editData?.currency_code || ""} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tên Tiền Tệ</Form.Label>
              <Form.Control type="text" name="currency_name" defaultValue={editData?.currency_name || ""} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tỷ Giá</Form.Label>
              <Form.Control type="number" step="0.000001" name="exchange_rate" defaultValue={editData?.exchange_rate || ""} required />
            </Form.Group>
            <Button type="submit" className="mt-3" variant="success">Lưu</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CurrenciesTable;
