import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axiosClient from "../libs/axios-client";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: "", username: "", email: "", password: "" });
  const MySwal = withReactContent(Swal);
  const [reload, setReload] = useState(false);

  // Gọi API lấy danh sách người dùng
  const fetchUsers = () => {
    axiosClient.get("/users")
      .then(response => {
        console.log("Dữ liệu trả về từ API:", response.data);
        if (response.data && response.data.data && Array.isArray(response.data.data.content)) {
          setUsers(response.data.data.content); 
        } else {
          console.error("Dữ liệu API không hợp lệ!", response.data);
        }
      })
      .catch(error => {
        console.error("Lỗi lấy danh sách người dùng:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  // Mở modal thêm mới
  const handleShow = () => {
    setNewUser({ fullName: "", username: "", email: "", password: "" }); // Reset form
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Xử lý thêm người dùng
  const handleAddUser = () => {
    if (!newUser.fullName || !newUser.username || !newUser.email || !newUser.password) {
      MySwal.fire("Lỗi", "Vui lòng nhập đầy đủ thông tin!", "error");
      return;
    }

    axiosClient.post("/users", newUser)
      .then(() => {
        MySwal.fire("Thành công", "Thêm người dùng thành công!", "success");
        setShowModal(false);
        setReload(prev => !prev); // Làm mới danh sách người dùng
      })
      .catch(error => {
        console.error("Lỗi khi thêm người dùng:", error);
        MySwal.fire("Lỗi", "Không thể thêm người dùng!", "error");
      });
  };

  // Xử lý xóa người dùng
  const handleDelete = (user) => {
    MySwal.fire({
      title: 'Xác nhận xóa',
      text: `Bạn có chắc muốn xóa người dùng ${user.fullName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            MySwal.fire("Thành công", "Xóa người dùng thành công!", "success");
            setReload(prev => !prev);
          })
          .catch(() => {
            MySwal.fire("Oops...", "Có lỗi xảy ra khi xóa!", "error");
          });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Quản lý người dùng</h2>
      
      {/* Nút mở modal thêm mới */}
      <div>
        <Button variant="primary" className="mb-3" onClick={handleShow}>
          Thêm mới
        </Button>
      </div>

      {/* Bảng danh sách người dùng */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr className="table-primary">
            <th>#</th>
            <th>Họ Tên</th>
            <th>Tên tài khoản</th>
            <th>Email</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user)}>
                    <TrashFill />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal thêm mới */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Người Dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên tài khoản"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPage;
