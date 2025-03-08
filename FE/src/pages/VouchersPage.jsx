import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../libs/axios-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import TemplateVoucher from "../components/TemplateVoucher";

function VouchersPage() {
    const [data, setData] = useState([]);
    const [currentPagination, setCurrentPagination] = useState(0);
    const [totalPagination, setTotalPagination] = useState(1);
    const [currentVoucher, setCurrentVoucher] = useState(null);
    const MySwal= withReactContent(Swal);
    const [reload, setReload] = useState(false);
    const [showVoucher, setShowVoucher] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await axiosClient.get("/vouchers", {
                params: {
                    page: currentPagination,
                }
            }).then((res) => {
                setData(res.data.content);
                setTotalPagination(res.data.totalPages);
            });
        }
        fetchData();
    }, [currentPagination, reload]);

    const formatDateTime = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString();
    }

    const formartCurrency = (currency) => {
        return currency.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    }

    const handleDeleteVoucher = async (id) => {
      MySwal.fire({
        title: 'Xác nhận xóa',
        text: `Bạn có chắc chắn muốn xóa chứng từ này?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosClient.delete(`/vouchers/${id}`).then((res) => {
            if (res.status === 200) {
                MySwal.fire({
                  icon: 'success',
                  title: 'Xóa thành công chứng từ!',
                  showConfirmButton: false,
                  timer: 1500
                });
                setReload(!reload);
            }
          }).catch((err) => {
            MySwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message ?? 'Có lỗi xảy ra khi xóa chứng từ!',
            });
          });
        }
      });
    }

    const handleExportVoucher = () => {
      if(!currentVoucher) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Vui lòng chọn chứng từ cần in!',
        });
        return;
      }
    
      setShowVoucher(true);

      setTimeout(() => {
        const printButton = document.querySelector('#printVoucherButton');
        if (printButton) {
          printButton.click();
        }
      }, 100);
    };

    const handleEditVoucher = (voucher) => {
      navigate('/receipt', { state: { data: voucher } });
    }

    return (
        <div className="card p-3 col-12 shadow-md">
          {/* Tiêu đề và dropdown thêm mới */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="m-0">Quản lý chứng từ</h5>
            <div className="d-flex gap-2">
              <button onClick={() => handleExportVoucher()} className="btn btn-success text-white">In</button>
              {showVoucher && <TemplateVoucher voucher={currentVoucher} setShowVoucher={setShowVoucher} />}

              <div className="dropdown">
                <button 
                  className="btn btn-info dropdown-toggle text-white" 
                  type="button" 
                  id="dropdownMenuButton" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Thêm mới
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link className="dropdown-item" to="/receipt">Phiếu thu</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/payment">Phiếu chi</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/othervoucher">Phiếu kế toán khác</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
    
          {/* Bảng quản lý chứng từ */}
          <table className="table table-bordered text-center table-hover">
            <thead className="table-primary">
              <tr>
                <th>Số CT</th>
                <th>Ngày CT</th>
                <th>Mã CT</th>
                <th>Mã đối tượng</th>
                <th>Tên đối tượng</th>
                <th>Tổng tiền</th>
                <th>Ngoại tệ</th>
                <th>Người lập</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.map((voucher, index) => (
                <tr style={{cursor:'pointer'}} key={voucher.id} onClick={() => setCurrentVoucher(voucher)}>
                  <td>{index + 1 }</td>
                  <td>{formatDateTime(voucher.voucherDate)}</td>
                  <td>{voucher.voucherNumber}</td>
                  <td>{voucher.entityCode}</td>
                  <td>{voucher.entityName}</td>
                  <td>{formartCurrency(voucher.totalAmount)}</td>
                  <td>{voucher.currentCode}</td>
                  <td>{voucher.createBy}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary mx-1" onClick={() => handleEditVoucher(voucher)}>✏️</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteVoucher(voucher.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPagination != 1 && <div className="d-flex justify-content-end mt-3 mb-3">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {currentPagination > 0 && <li className="page-item"><button onClick={() => setCurrentPagination(currentPagination - 1)} className="page-link">&laquo;</button></li>}
                {Array.from({length: totalPagination}, (_, index) => (
                  <li key={index} className={`page-item ${index == currentPagination ? 'active' : ''}`}><button onClick={() => setCurrentPagination(index)} className="page-link">{index + 1}</button></li>
                ))}
                {currentPagination < totalPagination - 1 && <li className="page-item"><button onClick={() => setCurrentPagination(currentPagination + 1)} className="page-link">&raquo;</button></li>}
              </ul>
            </nav>
          </div>}
          {/* Chi tiết */}
          <h5 className="mt-2">Chi tiết chứng từ</h5>
          <table className="table table-bordered text-center">
            <thead className="table-primary">
              <tr>
                <th>TK nợ</th>
                <th>TK có</th>
                <th>Mã đối tượng</th>
                <th>Tên đối tượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {currentVoucher && currentVoucher.details.map((detail, index) => (
                <tr key={index}>
                    <td>{detail.accountDebitCode}</td>
                    <td>{detail.accountCreditCode}</td>
                    <td>{currentVoucher.entityCode}</td>
                    <td>{currentVoucher.entityName}</td>
                    <td>{formartCurrency(detail.amount)}</td>
                </tr> 
              ))}
            </tbody>
          </table>
    
          {/* Nút Lọc và In */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary mx-1">Lọc</button>
            <button className="btn btn-secondary">In</button>
          </div>
        </div>
      );
}

export default VouchersPage;