import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PartnerList from "../components/PartnerList";
import PartnersModal from "../components/PartnersModal";
import axiosClient from "../libs/axios-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const PartnerPage = ()=> {
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const MySwal = withReactContent(Swal);
  const [reload, setReload] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    const getData = async () => {
      axiosClient.get('/master-data/entities')
      .then((res) => {
        setData(res.data.content);
      });
    }
    getData();
  }, [reload])

  const handleAdd = () => {
    setSelectedEntity(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedEntity(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (item) => {
    MySwal.fire({
      title: 'Xác nhận xóa',
      text: `Bạn có chắc chắn muốn xóa đối tượng ${item.entityName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosClient.delete(`/master-data/entities/${item.id}`)
        .then(() => {
          MySwal.fire({
            icon: 'success',
            title: 'Thành công',
            text: `Xóa đối tượng ${item.entityName} thành công!`,
          });

          setReload(!reload);
        })
        .catch(() => {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Có lỗi xảy ra khi xóa đối tượng!',
          });
        });
      }
    });
  };

  const handleSave = async (entity) => {
    console.log(entity);
    try {
      let response;
      
      if (selectedEntity !== null) {
        // Gọi API cập nhật
        response = await axiosClient.put(`/master-data/entities/${entity.id}`, entity);
      } else {
        // Gọi API thêm mới
        response = await axiosClient.post("/master-data/entities", entity);
      }
  
      if (response.status === 200) {
        MySwal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Lưu thành công!',
        });
        
        setReload(!reload);
        setIsFormOpen(false);
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Lỗi khi lưu! " + (error.response?.data?.message || "Vui lòng thử lại."),
      });
    }
  };

  return (
    <div className="card col-12 p-3">
      <Container fluid className="d-flex flex-column">
        <Row className="w-100 p-2">
          
        </Row>

        <Row className="table-container">
          <Col xs={12} className="table-responsive">
            <PartnerList data={data} onDelete={handleDelete} onEdit={handleEdit} onAdd={handleAdd} />
          </Col>
        </Row>

        {isFormOpen && (
          <PartnersModal
            isOpen={isFormOpen} 
            onSave={handleSave} 
            onClose={() => setIsFormOpen(false)}
            initialData={selectedEntity} 
            />
        )}
      </Container>
    </div>
  );
};

export default PartnerPage;
