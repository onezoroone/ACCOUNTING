import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PartnerGroupList from "../components/PartnerGroupList";
import PartnerGroupForm from "../components/PartnerGroupForm";
import axiosClient from "../libs/axios-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const PartnerGroupPage = () => {
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [reload, setReload] = useState(false);
  const MySwal = withReactContent(Swal);

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

  const handleAdd = () => {
    setEditIndex(null);
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
    <Container fluid className="vh-100 d-flex flex-column">
      <Row className="w-100 p-2">
        {/* Có thể thêm các thành phần khác ở đây */}
      </Row>

      <Row className="table-container">
        <Col xs={12} className="table-responsive">
          <PartnerGroupList data={data} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />
        </Col>
      </Row>

      {isFormOpen && (
        <PartnerGroupForm
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
          initialData={editIndex !== null ? data[editIndex] : null}
        />
      )}
    </Container>
  );
};

export default PartnerGroupPage;