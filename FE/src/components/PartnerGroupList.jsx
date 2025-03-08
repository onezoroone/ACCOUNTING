import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const PartnerGroupList = ({ data, onAdd, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <h2 className="text-center mb-3">Danh sách nhóm đối tượng</h2>
      <div>
              {/* Nút Thêm mới */}
      <Button variant="primary" className="mb-3" onClick={onAdd}>Thêm mới</Button>
      </div>
      <Table striped bordered hover responsive className="w-100">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Tên nhóm đối tượng</th>
            <th>Mã nhóm đối tượng</th>
            <th>Mã mẹ</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.entityGroupName}</td>
                <td>{item.entityCode}</td>
                <td>{item.parentCode}</td>
                <td>
                    <Button 
                      variant="warning" 
                      size="sm" 
                      onClick={() => onEdit(item)}
                    >
                      ✏️
                    </Button>
                </td>
                <td>
                  <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => onDelete(item)}
                    >
                      🗑️
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6" className="text-center">Không có dữ liệu</td></tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PartnerGroupList;