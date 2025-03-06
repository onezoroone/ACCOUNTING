import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PartnerGroupList from "../components/PartnerGroupList";
import PartnerGroupForm from "../components/PartnerGroupForm";
import axiosClient from "../libs/axios-client";
<<<<<<< HEAD
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
=======
>>>>>>> 766536d (newupdate)

const PartnerGroupPage = () => {
  const [data, setData] = useState([]); // Danh sách nhóm đối tượng
  const [isFormOpen, setIsFormOpen] = useState(false);
<<<<<<< HEAD
  const [editIndex, setEditIndex] = useState(null);
  const [reload, setReload] = useState(false);
  const MySwal = withReactContent(Swal);
=======
  const [selectedEntity, setSelectedEntity] = useState(null);
>>>>>>> 766536d (newupdate)

  // Gọi API lấy danh sách nhóm đối tượng
  useEffect(() => {
<<<<<<< HEAD
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
=======
    fetchData();
  }, []);
>>>>>>> 766536d (newupdate)

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

<<<<<<< HEAD
  const handleEdit = (index) => {
    setEditIndex(index);
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
          setReload(!reload);
        } catch {
          MySwal.fire('Oops...', 'Có lỗi xảy ra khi xóa nhóm đối tác!', 'error');
        }
      }
    });
  };

  const handleSubmit = async (newData) => {
    if (editIndex !== null) {
      // Cập nhật dữ liệu
      try {
        await axiosClient.put(`/master-data/entity-groups/${newData.id}`, newData);
        MySwal.fire('Thành công!', 'Cập nhật nhóm đối tác thành công!', 'success');
      } catch {
        MySwal.fire('Oops...', 'Có lỗi xảy ra khi cập nhật nhóm đối tác!', 'error');
      }
    } else {
      // Thêm mới dữ liệu
      try {
        await axiosClient.post('/master-data/entity-groups', newData);
        MySwal.fire('Thành công!', 'Thêm mới nhóm đối tác thành công!', 'success');
      } catch {
        MySwal.fire('Oops...', 'Có lỗi xảy ra khi thêm mới nhóm đối tác!', 'error');
      }
    }
    setIsFormOpen(false);
    setReload(!reload);
  };

=======
  // Khi ấn "Lưu" trong form
  const handleSave = async (newData) => {
    try {
      const response = await axiosClient.post("/master-data/entity-groups", newData);
      setData([...data, response.data]); // Cập nhật danh sách ngay lập tức
      setIsFormOpen(false);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  // Khi ấn "Sửa"
  const handleEdit = (entity) => {
    console.log("Sửa nhóm:", entity); // Debug
    setSelectedEntity(entity);
    setIsFormOpen(true);
  };
  
  // Khi ấn "Lưu" sau khi sửa
  const handleUpdate = async (updatedData) => {
    try {
      const response = await axiosClient.put(`/master-data/entity-groups/${updatedData.id}`, updatedData);
      const updatedItem = response.data; // Lấy dữ liệu mới từ API
  
      setData(data.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  
      setIsFormOpen(false); // Đóng form
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
    }
  };

  // Khi ấn "Xóa"
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa nhóm này?")) return;
    
    try {
      await axiosClient.delete(`/master-data/entity-groups/${id}`);
      
      // Cập nhật danh sách sau khi xóa
      setData(data.filter(item => item.id !== id));
      
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
    }
  };

>>>>>>> 766536d (newupdate)
  return (
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
          onSave={selectedEntity ? handleUpdate : handleSave} 
          initialData={selectedEntity} 
        />
      )}
    </Container>
  );
};

export default PartnerGroupPage;
