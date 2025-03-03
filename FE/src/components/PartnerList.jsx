import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import PartnersModal from "./PartnersModal";

const PartnerList = ({ data, setData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    setSelectedEntity(null);
    setEditIndex(null);
    setModalOpen(true);
  };

  const handleEdit = (index) => {
    setSelectedEntity(data[index]);
    setEditIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đối tượng này không?")) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const handleSave = (entity) => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = entity;
      setData(updatedData);
    } else {
      setData([...data, entity]);
    }
    setModalOpen(false);
  };

  return (
    <div className="table-responsive">
      <h2 className="text-center mb-3">Danh sách Đối tượng</h2>
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
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.tax_code}</td>
              <td>{item.entity_code}</td>
              <td>{item.entity_name}</td>
              <td>{item.address}</td>
              <td>{item.phone_number}</td>
              <td>{item.email}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(index)}>✏️</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleAdd}>Thêm mới</Button>

      {/* Modal */}
      <PartnersModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSave} 
        initialData={selectedEntity} 
      />
    </div>
  );
};

export default PartnerList;
