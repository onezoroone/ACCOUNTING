import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DocumentManagement = () => {
  return (
    <div className="container mt-3">
      {/* Quản lý chứng từ */}
      <h5 className="mt-3">Quản lý chứng từ</h5>
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
                <button className="btn btn-sm btn-outline-primary mx-1">✏️</button>
                <button className="btn btn-sm btn-outline-danger">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-secondary">Thêm mới</button>

      {/* Chi tiết */}
      <h5 className="mt-4 text-center">Chi tiết</h5>
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
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary mx-1">Lọc</button>
        <button className="btn btn-secondary">In</button>
      </div>
    </div>
  );
};

export default DocumentManagement;