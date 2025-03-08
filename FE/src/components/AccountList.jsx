import { Table, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

const AccountList = ({ data, onEdit, onDelete, onAdd }) => {
  return (
    <div className="table-responsive">
      <h2 className="text-center">Danh sách Tài Khoản</h2>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={onAdd}>Thêm mới</Button>
        </div>
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
                <Button variant="" size="sm" onClick={() => onDelete(item)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
AccountList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    accountCode: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    accountType: PropTypes.string.isRequired
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default AccountList;
