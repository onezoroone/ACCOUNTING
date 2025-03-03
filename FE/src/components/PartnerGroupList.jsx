import React from "react";
import { Table, Button } from "react-bootstrap";

const PartnerGroupList = ({ data, onEdit, onDelete, onAdd }) => {
  return (
    <div className="table-responsive">
      <h2 className="text-center mb-3">Danh sách nhóm đối tượng</h2>
      <Table striped bordered hover responsive className="w-100">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Mã nhóm đối tượng</th>
            <th>Tên nhóm đối tượng</th>
            <th>Mã mẹ</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.entity_code}</td>
              <td>{item.entity_group_name}</td>
              <td>{item.parent_code}</td>
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

export default PartnerGroupList;
