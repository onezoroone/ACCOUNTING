import React from "react";
import { Table, Button } from "react-bootstrap";

const PartnerList = ({ data, onEdit, onDelete, onAdd }) => {
  return (
    <div className="table-responsive">
      <h2 className="text-center mb-3">Danh sách Tài Khoản</h2>
      <Table striped bordered hover responsive className="w-100">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Mã số thuế</th>
            <th>Mã đối tượng</th>
            <th>Tên đối tượng</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.taxCode}</td>
              <td>{item.objectCode}</td>
              <td>{item.objectName}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>
                <Button variant="" size="sm" onClick={() => onEdit(index)}>✏️</Button>
              </td>
              <td>
                <Button variant="" size="sm" onClick={() => onDelete(index)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-start ">
        <Button variant="primary" onClick={onAdd}>Thêm mới</Button>
      </div>
    </div>
  );
};

export default PartnerList;
