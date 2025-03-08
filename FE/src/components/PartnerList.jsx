import { Table, Button } from "react-bootstrap";
import PropTypes from "prop-types"; 

const PartnerList = ({ data, onDelete, onEdit, onAdd }) => {

  return (
    <div className="table-responsive">
      <h2 className="text-center mb-3">Danh sách Đối tượng</h2>
      <div>
              {/* Nút Thêm mới */}
      <Button variant="primary" className="mb-3" onClick={onAdd}>Thêm mới</Button>
      </div>
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
              <td>{item.entityCode}</td>
              <td>{item.entityName}</td>
              <td>{item.address}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.email}</td>
              <td>
                <Button variant="white" size="sm" onClick={() => onEdit(item)}>✏️</Button>{' '}
              </td>
              <td>
              <Button variant="white" size="sm" onClick={() => onDelete(item)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
PartnerList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    taxCode: PropTypes.string,
    entityCode: PropTypes.string,
    entityName: PropTypes.string,
    entityGroupCode: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};
export default PartnerList;
