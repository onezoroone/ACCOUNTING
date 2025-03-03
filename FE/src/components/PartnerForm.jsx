import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PartnerForm = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || { taxCode: "", objectCode: "", objectName: "", address: "", phone: "", email: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin đối tượng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="taxCode">
                <Form.Label>Mã số thuế</Form.Label>
                <Form.Control type="text" name="taxCode" value={formData.taxCode} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="address">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="objectCode">
                <Form.Label>Mã đối tượng</Form.Label>
                <Form.Control type="text" name="objectCode" value={formData.objectCode} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="objectName">
                <Form.Label>Tên đối tượng</Form.Label>
                <Form.Control type="text" name="objectName" value={formData.objectName} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Lưu
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PartnerForm;
