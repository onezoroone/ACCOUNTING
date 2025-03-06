import React from "react";
import { Table, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

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
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.entityCode}</td>
              <td>{item.entityGroupName}</td>
              <td>{item.parentCode}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => onEdit(index)}>✏️</Button>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-start">
        <Button variant="primary" onClick={onAdd}>Thêm mới</Button>
      </div>
    </div>
  );
};

PartnerGroupList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    entityCode: PropTypes.string.isRequired,
    entityGroupName: PropTypes.string.isRequired,
    parentCode: PropTypes.string,
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default PartnerGroupList;
