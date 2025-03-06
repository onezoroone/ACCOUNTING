import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PartnerGroupForm = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || { entityCode: "", entityGroupName: "", parentCode: ""}
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
        <Modal.Title>Thông tin nhóm đối tượng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="entityCode">
                <Form.Label>Mã nhóm đối tượng</Form.Label>
                <Form.Control type="text" name="entityCode" value={formData.entityCode} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="entityGroupName">
                <Form.Label>Tên nhóm đối tượng</Form.Label>
                <Form.Control type="text" name="entityGroupName" value={formData.entityGroupName} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="parentCode">
                <Form.Label>Mã mẹ</Form.Label>
                <Form.Control type="text" name="parentCode" value={formData.parentCode} onChange={handleChange} />
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

PartnerGroupForm.PropTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
      entityCode: PropTypes.string,
      entityGroupName: PropTypes.string,
      parentCode: PropTypes.string,
    }),
};

export default PartnerGroupForm;