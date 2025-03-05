import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PartnerGroupForm = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    entity_group_code: "",
    entity_group_name: "",
    parent_code: "",
  });

  // Cập nhật formData khi sửa dữ liệu
  useEffect(() => {
    setFormData({
      entity_group_code: initialData?.entity_group_code || "",
      entity_group_name: initialData?.entity_group_name || "",
      parent_code: initialData?.parent_code || "",
    });
  }, [initialData]);
  

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin nhóm đối tượng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="entity_group_code">
                <Form.Label>Mã nhóm đối tượng</Form.Label>
                <Form.Control 
                  type="text" 
                  name="entity_group_code" 
                  value={formData.entity_group_code} 
                  onChange={handleChange} 
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="entity_group_name">
                <Form.Label>Tên nhóm đối tượng</Form.Label>
                <Form.Control 
                  type="text" 
                  name="entity_group_name" 
                  value={formData.entity_group_name} 
                  onChange={handleChange} 
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="parent_code">
                <Form.Label>Mã mẹ</Form.Label>
                <Form.Control 
                  type="text" 
                  name="parent_code" 
                  value={formData.parent_code} 
                  onChange={handleChange} 
                />
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

export default PartnerGroupForm;
