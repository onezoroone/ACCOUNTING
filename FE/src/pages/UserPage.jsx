import { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
function UserPage() {
    const [users, setUsers] = useState([
        { id: 1, name: "Nguyễn Văn A", email: "a@example.com" },
        { id: 2, name: "Trần Thị B", email: "b@example.com" },
      ]);
      const [show, setShow] = useState(false);
      const [newUser, setNewUser] = useState({ name: "", email: "" });
    
      const handleShow = () => setShow(true);
      const handleClose = () => {
        setShow(false);
        setNewUser({ name: "", email: "" });
      };
    
      const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = () => {
        if (newUser.name && newUser.email) {
          setUsers([...users, { id: users.length + 1, ...newUser }]);
          handleClose();
        }
      };
    
      const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
      };
    
      return (
        <div className="container mt-4">
          <h2>Quản lý người dùng</h2>
          <Button variant="primary" onClick={handleShow} className="mb-3">
            Thêm mới
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Modal thêm mới */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                    placeholder="Nhập tên"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Lưu
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
}

export default UserPage;