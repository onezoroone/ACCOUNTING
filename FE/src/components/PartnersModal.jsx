import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const PartnersModal = ({ isOpen, onClose, onSave, initialData }) => {
  const initialFormData = {
    entityGroupCode: "",
    taxCode: "",
    entityCode: "",
    entityName: "",
    address: "",
    phoneNumber: "",
    email: ""
  };

  const [formData, setFormData] = useState(initialData ?? initialFormData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    setErrors({});

    // Kiểm tra các trường bắt buộc
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "entityGroupCode" && key !== "phoneNumber" && key !== "email" && key !== "website") {
        newErrors[key] = "Trường này không được để trống";
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }    

    if (formData.phoneNumber && !/^\d{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Xóa lỗi khi nhập
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose(); // Đóng modal sau khi gửi thành công
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Chỉnh sửa đối tượng" : "Thêm đối tượng mới"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nhóm đối tượng</Form.Label>
                <Form.Control
                  type="text"
                  name="entityGroupCode"
                  value={formData.entityGroupCode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Mã số thuế</Form.Label>
                <Form.Control
                  type="text"
                  name="taxCode"
                  value={formData.taxCode}
                  onChange={handleChange}
                  isInvalid={!!errors.taxCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.taxCode}
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
                  name="entityCode"
                  value={formData.entityCode}
                  onChange={handleChange}
                  isInvalid={!!errors.entityCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.entityCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Tên đối tượng</Form.Label>
                <Form.Control
                  type="text"
                  name="entityName"
                  value={formData.entityName}
                  onChange={handleChange}
                  isInvalid={!!errors.entityName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.entityName}
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

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              isInvalid={!!errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
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

PartnersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    taxCode: PropTypes.string,
    entityCode: PropTypes.string,
    entityName: PropTypes.string,
    entityGroupCode: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string
  })
};

export default PartnersModal;
