import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PartnerGroupList from "../components/PartnerGroupList";
import PartnerGroupForm from "../components/PartnerGroupForm";
import { fetchEntityGroups, createEntityGroup, updateEntityGroup, deleteEntityGroup } from "../libs/axios-client";

const PartnerGroupPage = () => {
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Lấy dữ liệu từ API khi component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchEntityGroups();
        setData(result);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhóm đối tượng:", error);
      }
    };
    getData();
  }, []);

  const handleAdd = () => {
    setEditIndex(null);
    setIsFormOpen(true);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = async (index) => {
    try {
      await deleteEntityGroup(data[index].id);
      setData(data.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Lỗi khi xóa nhóm đối tượng:", error);
    }
  };

  const handleSubmit = async (newData) => {
    try {
      if (editIndex !== null) {
        // Cập nhật nhóm đối tượng
        const updatedData = await updateEntityGroup(data[editIndex].id, newData);
        setData(data.map((item, i) => (i === editIndex ? updatedData : item)));
      } else {
        // Thêm nhóm đối tượng mới
        const createdData = await createEntityGroup(newData);
        setData([...data, createdData]);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật nhóm đối tượng:", error);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Row className="w-100 p-2"></Row>

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
