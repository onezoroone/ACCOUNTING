import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PartnerGroupList from "../components/PartnerGroupList";
import PartnerGroupForm from "../components/PartnerGroupForm";
import axiosClient from "../libs/axios-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


const PartnerGroupPage = () => {
  const [data, setData] = useState([]); // Danh sách nhóm đối tượng
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [reload, setReload] = useState(false);
  const MySwal = withReactContent(Swal);
  const [selectedEntity, setSelectedEntity] = useState(null);


  // Gọi API lấy danh sách nhóm đối tượng
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/master-data/entity-groups');
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/master-data/entity-groups");
      setData(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Khi ấn "Thêm mới"
  const handleAdd = () => {
    setSelectedEntity(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedEntity(item); // Lưu dữ liệu nhóm cần sửa
    setIsFormOpen(true);
  };  

  const handleDelete = async (item) => {
    MySwal.fire({
      title: 'Xác nhận xóa',
      text: `Bạn có chắc chắn muốn xóa nhóm đối tác ${item.entity_group_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.delete(`/master-data/entity-groups/${item.id}`);
          MySwal.fire('Thành công!', 'Xóa nhóm đối tác thành công!', 'success');
          fetchData(); // Gọi lại API để cập nhật danh sách
        } catch (error) {
          console.error("Lỗi khi xóa:", error);
          MySwal.fire('Oops...', 'Có lỗi xảy ra khi xóa nhóm đối tác!', 'error');
        }
      }
    });
  };  

  const handleSubmit = async (newData) => {
    console.log("Dữ liệu gửi lên:", newData); // Debug dữ liệu gửi lên
  
    if (newData.id) {  // Kiểm tra nếu có ID => Cập nhật
      try {
        await axiosClient.put(`/master-data/entity-groups/${newData.id}`, newData);
        MySwal.fire('Thành công!', 'Cập nhật nhóm đối tác thành công!', 'success');
      } catch (error) {
        console.error("Lỗi cập nhật:", error.response?.data || error);
        MySwal.fire('Oops...', 'Có lỗi xảy ra khi cập nhật nhóm đối tác!', 'error');
      }
    } else {  // Nếu không có ID => Thêm mới
      try {
        await axiosClient.post('/master-data/entity-groups', newData);
        MySwal.fire('Thành công!', 'Thêm mới nhóm đối tác thành công!', 'success');
      } catch (error) {
        console.error("Lỗi thêm mới:", error.response?.data || error);
        MySwal.fire('Oops...', 'Có lỗi xảy ra khi thêm mới nhóm đối tác!', 'error');
      }
    }
  
    setIsFormOpen(false);
    setReload(!reload);
  };
  

  return (
    <div className="card col-12 p-3">
      <Container fluid>
        <Row className="mt-3">
          <Col xs={12}>
            <PartnerGroupList 
              data={data} 
              onAdd={handleAdd} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          </Col>
        </Row>
        {isFormOpen && (
          <PartnerGroupForm 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)} 
            onSave={handleSubmit} 
            initialData={selectedEntity} // Truyền dữ liệu đúng
          />
        )}
      </Container>
    </div>
<<<<<<< HEAD
    );
=======
  );
>>>>>>> 472861b4d8720153e36965fe952df4ce6e58d40c
};

export default PartnerGroupPage;
