import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const PartnerGroupForm = ({ isOpen, onClose, onSave, initialData }) => {
  const initialFormData = {
    entityGroupName: "",
    entityCode: "",
    parentCode: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Reset form khi mở modal
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || initialFormData);
      setErrors({});
    }
  }, [isOpen, initialData]);

  // Kiểm tra lỗi
  const validate = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "parentCode") {
        newErrors[key] = "Trường này không được để trống";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Cập nhật dữ liệu nhập vào
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Xóa lỗi chỉ của trường đang nhập
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (initialData) {
        onSave({ ...formData, id: initialData.id }); // Gọi update nếu có ID
      } else {
        onSave(formData); // Gọi create nếu không có ID
      }
      onClose();
    }
  };
  

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Chỉnh sửa nhóm đối tượng" : "Thêm nhóm đối tượng mới"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="entityGroupName">
                <Form.Label>Tên nhóm đối tượng</Form.Label>
                <Form.Control
                  type="text"
                  name="entityGroupName"
                  value={formData.entityGroupName}
                  onChange={handleChange}
                  isInvalid={!!errors.entityGroupName}
                  placeholder="Nhập tên nhóm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.entityGroupName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="entityCode">
                <Form.Label>Mã nhóm đối tượng</Form.Label>
                <Form.Control
                  type="text"
                  name="entityCode"
                  value={formData.entityCode}
                  onChange={handleChange}
                  isInvalid={!!errors.entityCode}
                  placeholder="Nhập mã nhóm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.entityCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="parentCode">
                <Form.Label>Mã mẹ</Form.Label>
                <Form.Control
                  type="text"
                  name="parentCode"
                  value={formData.parentCode}
                  onChange={handleChange}
                  placeholder="(Không bắt buộc)"
                />
              </Form.Group>
            </Col>
          </Row>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" variant="primary">
              Lưu
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

PartnerGroupForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    entityGroupName: PropTypes.string,
    entityCode: PropTypes.string,
    parentCode: PropTypes.string,
  }),
};
export default PartnerGroupForm;
