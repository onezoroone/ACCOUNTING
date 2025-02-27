import React from "react";
import { Table, Button } from "react-bootstrap";

const AccountList = ({ data, onEdit, onDelete, onAdd }) => {
  return (
    <div className="table-responsive">
      <h2 className="text-center mb-3">Danh sách Tài Khoản</h2>
      <Table striped bordered hover responsive className="w-100">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Mã tài khoản</th>
            <th>Tên tài khoản</th>
            <th>Tài khoản cha</th>
            <th>Loại tài khoản</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.accountCode}</td>
              <td>{item.accountName}</td>
              <td>{item.parentId}</td>
              <td>{item.accountType}</td>
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

export default AccountList;
