import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const VoucherManagementForm = () => {
  return (
    <div className="container mt-3">
      {/* Tiêu đề và dropdown thêm mới */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="m-0">Quản lý chứng từ</h5>
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

      {/* Bảng quản lý chứng từ */}
      <table className="table table-bordered text-center">
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
          {[1, 2, 3].map((num) => (
            <tr key={num}>
              <td>{num}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button className="btn btn-sm btn-light border mx-1">✏️</button>
                <button className="btn btn-sm btn-light border">🗑️</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Chi tiết */}
      <h5 className="mt-4">Chi tiết chứng từ</h5>
      <table className="table table-bordered text-center">
        <thead className="table-primary">
          <tr>
            <th>Số CT</th>
            <th>TK nợ</th>
            <th>TK có</th>
            <th>Mã đối tượng</th>
            <th>Tên đối tượng</th>
            <th>Tổng tiền</th>
            <th>Thành tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="btn btn-sm btn-outline-primary mx-1">✏️</button>
              <button className="btn btn-sm btn-outline-danger">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Nút Lọc và In */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary mx-1">Lọc</button>
        <button className="btn btn-secondary">In</button>
      </div>
    </div>
  );
};

export default VoucherManagementForm;