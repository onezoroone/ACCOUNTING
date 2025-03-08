import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import axiosClient from "../libs/axios-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Select from 'react-select'
import { Link } from "react-router-dom";

function RolePage() {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState({
        roleName: '',
        description: '',
        permissions: []
    });
    
    const [isEdit, setIsEdit] = useState(false);
    const [permissions, setPermissions] = useState([]);

    const Myswal = withReactContent(Swal);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosClient.get("/roles")
            setData(res.data.roles);
            setPermissions(res.data.permissions);
        };
        fetchData();
    }, [reload]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roleToSend = {
            roleName: selectedRole.roleName,
            description: selectedRole.description,
            permissionIds: selectedRole.permissions.map(p => p.id)            
        };
        if (isEdit) {
            await axiosClient.put(`/roles/${selectedRole.id}`, roleToSend)
                .then(() => {
                    Myswal.fire({
                        icon: "success",
                        title: "Thành công",
                        text: "Chỉnh sửa vai trò thành công",
                    });

                    setIsFormOpen(false);
                    setReload(!reload);
                }).catch((err) => {
                    Myswal.fire({
                        icon: "error",
                        title: "Thất bại",
                        text: err.response.data.message ?? "Chỉnh sửa vai trò thất bại",
                    });
                });
        } else {
            await axiosClient.post("/roles", roleToSend)
                .then(() => {
                    Myswal.fire({
                        icon: "success",
                        title: "Thành công",
                        text: "Thêm mới vai trò thành công",
                    });

                    setIsFormOpen(false);
                    setReload(!reload);
                }).catch((err) => {
                    Myswal.fire({
                        icon: "error",
                        title: "Thất bại",
                        text: err.response.data.message ?? "Thêm mới vai trò thất bại",
                    });
                });
        }
    }

    const handleChange = (e) => {
        setSelectedRole(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    

    const handleAdd = () => {
        setIsEdit(false);
        setIsFormOpen(true);
        setSelectedRole({ roleName: '', description: '', permissions: [] });
    }

    const handleDelete = async (item) => {
        Myswal.fire({
            title: "Xác nhận",
            text: `Bạn có chắc chắn muốn xóa vai trò ${item.roleName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosClient.delete(`/roles/${item.id}`)
                    .then(() => {
                        Myswal.fire({
                            icon: "success",
                            title: "Thành công",
                            text: "Xóa vai trò thành công",
                        });

                        setReload(!reload);
                    }).catch((err) => {
                        Myswal.fire({
                            icon: "error",
                            title: "Thất bại",
                            text: err.response.data.message ?? "Xóa vai trò thất bại",
                        });
                    });
            }
        });
    }

    const handleEdit = (item) => {
        setIsEdit(true);
        setSelectedRole(item);
        setIsFormOpen(true);
    }

    return (  
        <div className="card col-12 p-3">
            <Container fluid className="d-flex flex-column">
                <Row className="table-container">
                    <Col xs={12} className="table-responsive">
                        <div className="table-responsive">
                            <h2 className="text-center mb-3">Danh sách Vai Trò</h2>
                            <div className="mb-3">
                                <Button variant="primary" onClick={handleAdd}>Thêm mới</Button>
                                <Link to="/permissions" className="btn btn-success ms-3">Quản lý quyền</Link>
                            </div>
                            <Table striped bordered hover responsive className="w-100">
                                <thead className="table-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Vai trò</th>
                                        <th>Mô tả</th>
                                        <th>Quyền</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.roleName}</td>
                                        <td>{item.description}</td>
                                        <td>{item.permissions.map(permission => permission.permissionName).join(", ")}</td>
                                        <td>
                                            <Button variant="" size="sm" onClick={() => handleEdit(item)}>✏️</Button>
                                        </td>
                                        <td>
                                            <Button variant="" size="sm" onClick={() => handleDelete(item)}>🗑️</Button>
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-start ">
                            </div>
                        </div>
                    </Col>
                </Row>

                <Modal show={isFormOpen} onHide={() => setIsFormOpen(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEdit ? "Chỉnh sửa vai trò" : "Thêm mới vai trò"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col md={12}>
                                    <Form.Group controlId="roleName">
                                        <Form.Label>Vai trò</Form.Label>
                                        <Form.Control type="text" name="roleName" value={selectedRole.roleName} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="description">
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control rows={4} as="textarea" name="description" value={selectedRole.description} onChange={handleChange} />
                                    </Form.Group>
                                </Col>

                                <Col md={12}>
                                    <Form.Group controlId="permission">
                                        <Form.Label>Quyền</Form.Label>
                                        <Select
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={permissions.map(permission => ({ 
                                                value: permission.id, 
                                                label: permission.permissionName 
                                            }))} 
                                            value={selectedRole.permissions.map(permission => ({ 
                                                value: permission.id, 
                                                label: permission.permissionName 
                                            }))}
                                            onChange={(value) => setSelectedRole({ 
                                                ...selectedRole, 
                                                permissions: value.map(item => ({ 
                                                    id: item.value, 
                                                    permissionName: item.label 
                                                })) 
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end mt-3">
                                <Button variant="secondary" onClick={() => setIsFormOpen(false)} className="me-2">
                                    Hủy
                                </Button>
                                <Button type="submit" variant="primary">
                                    Lưu
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
}

export default RolePage;