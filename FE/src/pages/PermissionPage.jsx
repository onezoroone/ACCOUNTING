import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import axiosClient from "../libs/axios-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function PermissionPage() {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const Myswal = withReactContent(Swal);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosClient.get("/permissions")
            setData(res.data);
        };
        fetchData();
    }, [reload]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await axiosClient.put(`/permissions/${selectedPermission.id}`, selectedPermission)
                .then(() => {
                    Myswal.fire({
                        icon: "success",
                        title: "Thành công",
                        text: "Chỉnh sửa quyền thành công",
                    });

                    setIsFormOpen(false);
                    setReload(!reload);
                }).catch((err) => {
                    Myswal.fire({
                        icon: "error",
                        title: "Thất bại",
                        text: err.response.data.message ?? "Chỉnh sửa quyền thất bại",
                    });
                });
        } else {
            await axiosClient.post("/permissions", selectedPermission)
                .then(() => {
                    Myswal.fire({
                        icon: "success",
                        title: "Thành công",
                        text: "Thêm mới quyền thành công",
                    });

                    setIsFormOpen(false);
                    setReload(!reload);
                }).catch((err) => {
                    Myswal.fire({
                        icon: "error",
                        title: "Thất bại",
                        text: err.response.data.message ?? "Thêm mới quyền thất bại",
                    });
                });
        }
    }

    const handleChange = (e) => {
        setSelectedPermission({ ...selectedPermission, [e.target.name]: e.target.value });
    }

    const handleAdd = () => {
        setIsEdit(false);
        setSelectedPermission(null);
        setIsFormOpen(true);
    }

    const handleDelete = async (id) => {
        Myswal.fire({
            title: "Xác nhận",
            text: "Bạn có chắc chắn muốn xóa quyền này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosClient.delete(`/permissions/${id}`)
                    .then(() => {
                        Myswal.fire({
                            icon: "success",
                            title: "Thành công",
                            text: "Xóa quyền thành công",
                        });

                        setReload(!reload);
                    }).catch((err) => {
                        Myswal.fire({
                            icon: "error",
                            title: "Thất bại",
                            text: err.response.data.message ?? "Xóa quyền thất bại",
                        });
                    });
            }
        });
    }

    const handleEdit = (item) => {
        setIsEdit(true);
        setSelectedPermission(item);
        setIsFormOpen(true);
    }

    return (  
        <div className="card col-12 p-3">
            <Container fluid className="d-flex flex-column">
                <Row className="table-container">
                    <Col xs={12} className="table-responsive">
                        <div className="table-responsive">
                            <h2 className="text-center mb-3">Danh sách Quyền</h2>
                            <div className="mb-3">
                                <Button variant="primary" onClick={handleAdd}>Thêm mới</Button>
                            </div>
                            <Table striped bordered hover responsive className="w-100">
                                <thead className="table-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Quyền</th>
                                        <th>Mô tả</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.permissionName}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <Button variant="" size="sm" onClick={() => handleEdit(item)}>✏️</Button>
                                        </td>
                                        <td>
                                            <Button variant="" size="sm" onClick={() => handleDelete(item.id)}>🗑️</Button>
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
                        <Modal.Title>{isEdit ? "Chỉnh sửa quyền" : "Thêm mới quyền"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col md={12}>
                                    <Form.Group controlId="permissionName">
                                        <Form.Label>Quyền</Form.Label>
                                        <Form.Control type="text" name="permissionName" value={selectedPermission?.permissionName} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="description">
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control rows={4} as="textarea" name="description" value={selectedPermission?.description} onChange={handleChange} />
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

export default PermissionPage;