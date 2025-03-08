import { Table, Button } from "react-bootstrap";
import { useState } from "react";

const PartnerGroupList = ({ data, onAdd, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; 
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="table-responsive">
      <h2 className="text-center">Danh sách nhóm đối tượng</h2>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={onAdd}>Thêm mới</Button>
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
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={item.id}>
                <td>{currentPage * itemsPerPage + index + 1}</td>
                <td>{item.entityGroupName}</td>
                <td>{item.entityCode}</td>
                <td>{item.parentCode}</td>
                <td>
                  <Button variant="white" size="sm" onClick={() => onEdit(item)}>
                    ✏️
                  </Button>
                </td>
                <td>
                  <Button variant="" size="sm" onClick={() => onDelete(item)}>
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

      {totalPages > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                  &laquo;
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${index === currentPage ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index)}>
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PartnerGroupList;
