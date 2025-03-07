import { useEffect, useState } from "react";
import { Modal, Button, Form, Table, Col } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import axiosClient from "../libs/axios-client";
import { Link } from "react-router-dom";
import Select from 'react-select'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function UserPage() {
  const [users, setUsers] = useState([]);
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
    }
  };

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
          });
      }
    });
  };

  return (
    <div className="card col-12 p-3">
      <h2 className="text-center">Quản lý người dùng</h2>
      <div className="mb-3">
        <Button variant="primary" onClick={handleShow}>
          Thêm mới
        </Button>
        <Link to="/roles" className="btn btn-success ms-3">Quản lý vai trò</Link>
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
                <Button variant="danger" size="sm" onClick={() => handleDelete(user)}>
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
                <li key={index} className={`page-item ${index == currentPage ? 'active' : ''}`}><button onClick={() => setCurrentPage(index)} className="page-link">{index + 1}</button></li>
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
                name="fullName"
                value={currentUser.fullName}
                onChange={handleChange}
                placeholder="Nhập tên"
                required
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
                required
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
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPage;