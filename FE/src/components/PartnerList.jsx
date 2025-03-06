import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import PartnersModal from "./PartnersModal";
import axiosClient from "../libs/axios-client";
import PropTypes from "prop-types"; 

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

  const handleSave = async (entity) => {
    try {
      let response;
      
      if (editIndex !== null) {
        // Gọi API cập nhật
        response = await axiosClient.put(`/master-data/entities/${entity.id}`, entity);
      } else {
        // Gọi API thêm mới
        response = await axiosClient.post("/master-data/entities", entity);
      }
  
      if (response.status === 200) {
        alert("Lưu thành công!");
        
        // Cập nhật danh sách với dữ liệu từ Backend
        setData((prevData) => {
          if (editIndex !== null) {
            return prevData.map((item) => (item.id === entity.id ? response.data : item));
          } else {
            return [...prevData, response.data];
          }
        });
  
        setModalOpen(false);
      }
    } catch (error) {
      alert("Lỗi khi lưu! " + (error.response?.data?.message || "Vui lòng thử lại."));
    }
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
