import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import PartnersModal from "./PartnersModal";
import axiosClient from "../libs/axios-client";

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

  const handleDelete = async (item) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đối tượng ${item.entityName} không?`)) {

      await axiosClient.delete('/master-data/entities/' + item.id)
      .then(() => {
        alert('Xóa đối tượng thành công');
        setData(prevData => prevData.filter(entity => entity.id !== item.id));
      }).catch((err) => {
        alert("Lỗi khi xóa!");
      })
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
                <Button variant="white" size="sm" onClick={() => handleEdit(index)}>✏️</Button>{' '}
              </td>
              <td>
              <Button variant="white" size="sm" onClick={() => handleDelete(item)}>🗑️</Button>
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
