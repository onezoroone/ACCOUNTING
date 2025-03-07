import { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";

function UserPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com" },
    { id: 2, name: "Trần Thị B", email: "b@example.com" },
  ]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: "", email: "" });

  const handleShow = () => {
    setEditMode(false);
    setCurrentUser({ id: null, name: "", email: "" });
    setShow(true);
  };
  
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (currentUser.name && currentUser.email) {
      if (editMode) {
        setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
      } else {
        setUsers([...users, { id: users.length + 1, ...currentUser }]);
      }
      handleClose();
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setShow(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Quản lý người dùng</h2>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Thêm mới
      </Button>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr className="table-primary">
            <th>#</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>
                  <PencilFill />
                </Button>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                  <TrashFill />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal thêm/sửa người dùng */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleChange}
                placeholder="Nhập tên"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentUser.email}
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