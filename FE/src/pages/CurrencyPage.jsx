import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axiosClient from "../libs/axios-client";

function CurrencyPage() {
    const [currencies, setCurrencies] = useState([]);
    const MySwal = withReactContent(Swal);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [reload, setReload] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Hiển thị 10 dòng mỗi trang

    useEffect(() => {
        axiosClient.get("/master-data/currencies")
            .then((response) => {
                setCurrencies(response.data);
            })
            .catch(error => {
                console.error("Lỗi khi tải danh sách tiền tệ:", error);
            });
    }, [reload]);  

    const totalPages = Math.ceil(currencies.length / itemsPerPage);
    const displayedData = currencies.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handleShow = (currency = null) => {
        setEditData(currency);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleSave = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newCurrency = {
            id: editData ? editData.id : null,
            currencyCode: formData.get("currency_code"),
            currencyName: formData.get("currency_name"),
            exchangeRate: parseFloat(formData.get("exchange_rate")),
        };

        if (editData) {
            axiosClient.put(`/master-data/currencies/${editData.id}`, newCurrency)
            .then(() => {
                MySwal.fire({ icon: 'success', title: 'Thành công', text: `Chỉnh sửa tiền tệ ${newCurrency.currencyCode} thành công!` });
                setReload(!reload);
                handleClose();
            }).catch((err) => {
                MySwal.fire({ icon: 'error', title: 'Oops...', text: err.response?.data?.message || 'Có lỗi xảy ra khi chỉnh sửa tiền tệ!' });
            });
        } else {
            axiosClient.post("/master-data/currencies", newCurrency)
            .then(() => {
                MySwal.fire({ icon: 'success', title: 'Thành công', text: `Thêm tiền tệ ${newCurrency.currencyCode} thành công!` });
                setReload(!reload);
                handleClose();
            }).catch((err) => {
                MySwal.fire({ icon: 'error', title: 'Oops...', text: err.response?.data?.message || 'Có lỗi xảy ra khi thêm tiền tệ!' });
            });
        }
    };

    const handleDelete = (item) => {
        MySwal.fire({
            title: 'Xác nhận xóa',
            text: `Bạn có chắc chắn muốn xóa tiền tệ ${item.currencyCode}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosClient.delete(`/master-data/currencies/${item.id}`)
                .then(() => {
                    MySwal.fire({ icon: 'success', title: 'Thành công', text: `Xóa tiền tệ ${item.currencyCode} thành công!` });
                    setReload(!reload);
                })
                .catch(() => {
                    MySwal.fire({ icon: 'error', title: 'Oops...', text: 'Có lỗi xảy ra khi xóa tiền tệ!' });
                });
            }
        });
    };

    return (
        <div className="card col-12 p-3">
            <h2 className="text-center">Danh sách tiền tệ</h2>
            <div className="d-flex justify-content-end mb-3">
                <Button variant="primary" className="mb-3" onClick={() => handleShow()}>Thêm mới</Button>
            </div>
            <Table striped bordered>
                <thead className="table-primary text-center">
                    <tr>
                        <th>#</th>
                        <th>Mã tiền tệ</th>
                        <th>Tên tiền tệ</th>
                        <th>Tỷ giá</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.length > 0 ? (
                        displayedData.map((currency, index) => (
                            <tr key={currency.id} className="text-center">
                                <td>{currentPage * itemsPerPage + index + 1}</td>
                                <td>{currency.currencyCode}</td>
                                <td>{currency.currencyName}</td>
                                <td>{currency.exchangeRate}</td>
                                <td>
                                    <Button variant="white" className="me-2" onClick={() => handleShow(currency)}>✏️</Button>
                                </td>
                                <td>
                                    <Button variant="white" onClick={() => handleDelete(currency)}>🗑️</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="6" className="text-center">Không có dữ liệu</td></tr>
                    )}
                </tbody>
            </Table>

            {/* Phân trang */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-end mt-3">
                    <Pagination>
                        <Pagination.Prev disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} />
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(currentPage + 1)} />
                    </Pagination>
                </div>
            )}

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editData ? "Chỉnh sửa tiền tệ" : "Thêm tiền tệ"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group>
                            <Form.Label>Mã tiền tệ</Form.Label>
                            <Form.Control type="text" name="currency_code" defaultValue={editData?.currencyCode || ""} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tên tiền tệ</Form.Label>
                            <Form.Control type="text" name="currency_name" defaultValue={editData?.currencyName || ""} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tỷ giá</Form.Label>
                            <Form.Control type="number" step="0.000001" name="exchange_rate" defaultValue={editData?.exchangeRate || ""} required />
                        </Form.Group>
                        <Button type="submit" className="mt-3" variant="success">Lưu</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CurrencyPage;
