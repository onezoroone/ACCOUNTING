import { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import axiosClient from "../libs/axios-client";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: "", email: "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      await axiosClient.get('/users', {
        params:{
          page: currentPage
        }
      }).then((res) => {
        setUsers(res.data.data.content);
        setTotalPage(res.data.data.totalPages);
      });
    }
    fetchUsers();
  }, [currentPage]);

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
    <div className="card col-12 p-3">
      <h2 className="text-center">Quản lý người dùng</h2>
      <div>
        <Button variant="primary" onClick={handleShow} className="mb-3">
          Thêm mới
        </Button>
      </div>
      <Table striped bordered className="text-center">
        <thead>
          <tr className="table-primary">
            <th>#</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Username</th>
            <th>Vai trò</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.roles.map(role => role.roleName).join(", ")}</td>
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
        {totalPage != 1 && <div className="d-flex justify-content-end mt-3 mb-5">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {currentPage > 0 && <li className="page-item"><button onClick={() => setCurrentPage(currentPage + 1)} className="page-link">&laquo;</button></li>}
              {Array.from({length: totalPage}, (_, index) => (
                <li key={index} className={`page-item ${index == currentPage ? 'active' : ''}`}><button className="page-link">{index + 1}</button></li>
              ))}
              {currentPage < totalPage - 1 && <li className="page-item"><button onClick={() => setCurrentPage(currentPage + 1)} className="page-link">&raquo;</button></li>}
            </ul>
          </nav>
        </div>}
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