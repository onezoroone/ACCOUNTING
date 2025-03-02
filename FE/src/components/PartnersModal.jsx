import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const PartnersModal = ({ isOpen, onClose, onSave, onSubmit, initialData }) => {
  const initialFormData = {
    entity_group_code: "",
    tax_code: "",
    entity_code: "",
    entity_name: "",
    address: "",
    contact_person: "",
    full_name: "",
    legal_representative: "",
    phone_number: "",
    email: "",
    website: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "website") {
        newErrors[key] = "Trường này không được để trống";
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (formData.phone_number && !/^\d{10,11}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Xóa lỗi khi nhập
  };

  const handleSave = (resetAfterSave = false) => {
    if (validate()) {
      onSave(formData);
      if (resetAfterSave) {
        setFormData(initialFormData);
      } else {
        onClose();
      }
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Chỉnh sửa đối tượng" : "Thêm đối tượng mới"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nhóm đối tượng</Form.Label>
                <Form.Control
                  type="text"
                  name="entity_group_code"
                  value={formData.entity_group_code}
                  onChange={handleChange}
                  isInvalid={!!errors.entity_group_code}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.entity_group_code}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Mã số thuế</Form.Label>
                <Form.Control
                  type="text"
                  name="tax_code"
                  value={formData.tax_code}
                  onChange={handleChange}
                  isInvalid={!!errors.tax_code}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tax_code}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Mã đối tượng</Form.Label>
                <Form.Control
                  type="text"
                  name="entity_code"
                  value={formData.entity_code}
                  onChange={handleChange}
                  isInvalid={!!errors.entity_code}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.entity_code}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Tên đối tượng</Form.Label>
                <Form.Control
                  type="text"
                  name="entity_name"
                  value={formData.entity_name}
                  onChange={handleChange}
                  isInvalid={!!errors.entity_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.entity_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <h5>Thông tin liên hệ</h5>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Người liên hệ</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  isInvalid={!!errors.contact_person}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contact_person}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  isInvalid={!!errors.full_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.full_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Đại diện pháp luật</Form.Label>
                <Form.Control
                  type="text"
                  name="legal_representative"
                  value={formData.legal_representative}
                  onChange={handleChange}
                  isInvalid={!!errors.legal_representative}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.legal_representative}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  isInvalid={!!errors.phone_number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone_number}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button  type="submit" variant="primary" onClick={() => handleSave(false)}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PartnersModal;
