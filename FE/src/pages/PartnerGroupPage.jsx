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
