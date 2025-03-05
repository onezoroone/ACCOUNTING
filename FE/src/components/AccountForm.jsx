import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AccountForm = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || { accountCode: "", accountName: "", parentId: "", accountType: "" }
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
        <Modal.Title>{initialData ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="accountCode">
                <Form.Label>Mã tài khoản</Form.Label>
                <Form.Control type="text" name="accountCode" value={formData.accountCode} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="parentId">
                <Form.Label>Mã tài khoản cha</Form.Label>
                <Form.Control type="text" name="parentId" value={formData.parentId} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="accountName">
                <Form.Label>Tên tài khoản</Form.Label>
                <Form.Control type="text" name="accountName" value={formData.accountName} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="accountType">
                <Form.Label>Loại tài khoản</Form.Label>
                <Form.Control type="text" name="accountType" value={formData.accountType} onChange={handleChange} required />
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
AccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    accountCode: PropTypes.string,
    accountName: PropTypes.string,
    parentId: PropTypes.string,
    accountType: PropTypes.string,
  }),
};

export default AccountForm;
