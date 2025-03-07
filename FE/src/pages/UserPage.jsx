<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
=======
import { useEffect, useState } from "react";
import { Modal, Button, Form, Table, Col } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
>>>>>>> 472861b4d8720153e36965fe952df4ce6e58d40c
import axiosClient from "../libs/axios-client";
import { Link } from "react-router-dom";
import Select from 'react-select'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

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
  const [currentUser, setCurrentUser] = useState({ id: null, username: "", email: "", fullName: "", password: "", roleIds: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [roles, setRoles] = useState([]);
  const Myswal = withReactContent(Swal);
  const [reload, setReload] = useState(false);

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
<<<<<<< HEAD
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
=======
  }, [currentPage, reload]);

  const handleFetchRoles = async () => {
    await axiosClient.get('/roles').then((res) => {
      setRoles(res.data.roles);
    });
  }

  const handleShow = async () => {
    if(roles.length == 0){
      await handleFetchRoles();
    }
    setEditMode(false);
    setCurrentUser({ id: null, username: "", email: "", fullName: "", password: "", roleIds: [] });
    setShow(true);
  };
  
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setCurrentUser(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser.fullName === "" || currentUser.email === "" || currentUser.username === "" || currentUser.roleIds.length === 0) {
      Myswal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập đầy đủ thông tin'
      });
    }else{
      if(currentUser.email && !currentUser.email.match(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g)){
        Myswal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Email không hợp lệ'
        });
        return;
      }

      if(currentUser.username.length < 3){
        Myswal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Username phải có ít nhất 3 ký tự'
        });
        return;
      }

      if (editMode) {
        await axiosClient.put('/users/' + currentUser.id, currentUser)
          .then(() => {
            Myswal.fire({
              icon: 'success',
              title: 'Thành công',
              text: 'Chỉnh sửa người dùng thành công'
            });
            setReload(!reload);
            handleClose();
          }
          ).catch((err) => {
            Myswal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: err.response.data.message ?? 'Có lỗi xảy ra khi chỉnh sửa người dùng'
            });
          });
      } else {
        if(currentUser.password.length < 6){
          Myswal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Mật khẩu phải có ít nhất 6 ký tự'
          });
          return;
        }
        await axiosClient.post('/users', currentUser)
          .then(() => {
            Myswal.fire({
              icon: 'success',
              title: 'Thành công',
              text: 'Thêm người dùng thành công'
            });
            setReload(!reload);
            handleClose();
          }).catch((err) => {
            Myswal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: err.response.data.message ?? 'Có lỗi xảy ra khi thêm mới người dùng'
            });
          });
      }
>>>>>>> 8aaa3f0b1ee9cca9c09697ea893bc957c16f5578
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

<<<<<<< HEAD
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
=======
  const handleEdit = async (user) => {
    if(roles.length == 0){
      await handleFetchRoles();
    }
    setEditMode(true);
    setCurrentUser(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        password: user.password ?? "",
        roleIds: user.roles.map(role => role.id)
      }
    );
    setShow(true);
  };

  const handleDelete = async (user) => {
    Myswal.fire({
      title: 'Bạn có chắc chắn muốn xóa người dùng này?',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete('/users/' + user.id)
          .then(() => {
            Myswal.fire('Đã xóa!', '', 'success');
            setReload(!reload);
          }).catch((err) => {
            Myswal.fire({
              icon: 'error',
              title: 'Lỗi',
              text: err.response.data.message ?? 'Có lỗi xảy ra khi xóa người dùng'
            });
>>>>>>> 8aaa3f0b1ee9cca9c09697ea893bc957c16f5578
          });
      }
    });
  };

  return (
    <div className="card col-12 p-3">
      <h2 className="text-center">Quản lý người dùng</h2>
<<<<<<< HEAD
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
=======
      <div className="mb-3">
        <Button variant="primary" onClick={handleShow}>
>>>>>>> 8aaa3f0b1ee9cca9c09697ea893bc957c16f5578
          Thêm mới
        </Button>
        <Link to="/roles" className="btn btn-success ms-3">Quản lý vai trò</Link>
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
                <Button variant="danger" size="sm" onClick={() => handleDelete(user)}>
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
                <li key={index} className={`page-item ${index == currentPage ? 'active' : ''}`}><button onClick={() => setCurrentPage(index)} className="page-link">{index + 1}</button></li>
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
<<<<<<< HEAD
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
=======
                name="fullName"
                value={currentUser.fullName}
                onChange={handleChange}
                placeholder="Nhập tên"
                required
>>>>>>> 8aaa3f0b1ee9cca9c09697ea893bc957c16f5578
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
<<<<<<< HEAD
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
=======
                required
>>>>>>> 8aaa3f0b1ee9cca9c09697ea893bc957c16f5578
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={currentUser.username}
                onChange={handleChange}
                placeholder="Nhập username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu(để trống nếu giữ nguyên)</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={currentUser.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </Form.Group>
            <Col md={12}>
                <Form.Group controlId="roles">
                    <Form.Label>Vai trò</Form.Label>
                    <Select
                        isMulti
                        closeMenuOnSelect={true}
                        options={roles.map(role => ({ 
                            value: role.id, 
                            label: role.roleName 
                        }))}
                        value={currentUser.roleIds?.map(roleId => {
                            const role = roles.find(r => r.id === roleId);
                            return role ? { value: role.id, label: role.roleName } : null;
                        }).filter(Boolean) || []}
                        onChange={(value) => setCurrentUser({ 
                            ...currentUser, 
                            roleIds: value.map(item => item.value) 
                        })}
                    />
                </Form.Group>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
<<<<<<< HEAD
          <Button variant="primary" onClick={handleAddUser}>
=======
          <Button variant="primary" type="submit" onClick={handleSubmit}>
>>>>>>> 8aaa3f0b1ee9cca9c09697ea893bc957c16f5578
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPage;
