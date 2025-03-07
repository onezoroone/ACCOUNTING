<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
=======
import { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
>>>>>>> 472861b4d8720153e36965fe952df4ce6e58d40c
import axiosClient from "../libs/axios-client";

function UserPage() {
  const [users, setUsers] = useState([]);
<<<<<<< HEAD
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: "", username: "", email: "", password: "" });
  const MySwal = withReactContent(Swal);
  const [reload, setReload] = useState(false);
=======
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
>>>>>>> 472861b4d8720153e36965fe952df4ce6e58d40c

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
    <div className="card col-12 p-3">
      <h2 className="text-center">Quản lý người dùng</h2>
<<<<<<< HEAD
      
      {/* Nút mở modal thêm mới */}
      <div>
        <Button variant="primary" className="mb-3" onClick={handleShow}>
          Thêm mới
        </Button>
      </div>

      {/* Bảng danh sách người dùng */}
      <Table striped bordered hover className="text-center">
=======
      <div>
        <Button variant="primary" onClick={handleShow} className="mb-3">
          Thêm mới
        </Button>
      </div>
      <Table striped bordered className="text-center">
>>>>>>> 472861b4d8720153e36965fe952df4ce6e58d40c
        <thead>
          <tr className="table-primary">
            <th>#</th>
            <th>Họ Tên</th>
            <th>Tên tài khoản</th>
            <th>Email</th>
<<<<<<< HEAD
=======
            <th>Username</th>
            <th>Vai trò</th>
            <th>Sửa</th>
>>>>>>> 472861b4d8720153e36965fe952df4ce6e58d40c
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
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
=======
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
>>>>>>> 472861b4d8720153e36965fe952df4ce6e58d40c
            </tr>
          )}
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
