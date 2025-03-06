import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PartnerList from "../components/PartnerList";
import PartnersModal from "../components/PartnersModal";
import axiosClient from "../libs/axios-client";

const PartnerPage = ()=> {

  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const getData = async () => {
      axiosClient.get('/master-data/entities')
      .then((res) => {
        setData(res.data.content);
      });
    }
    getData();
  }, [])

  const handleAdd = () => {
    setEditIndex(null);
    setIsFormOpen(true);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleSubmit = (newData) => {
    if (editIndex !== null) {
      setData(data.map((item, i) => (i === editIndex ? newData : item)));
    } else {
      setData([...data, newData]);
    }
    setIsFormOpen(false);
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Row className="w-100 p-2">
        
      </Row>

      <Row className="table-container">
        <Col xs={12} className="table-responsive">
          <PartnerList data={data} setData={setData} />
        </Col>
      </Row>

      {isFormOpen && (
        <PartnersModal
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
          initialData={editIndex !== null ? data[editIndex] : null}
        />
      )}
    </Container>
  );
};

export default PartnerPage;
