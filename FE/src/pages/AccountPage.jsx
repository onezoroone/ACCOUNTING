import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";

const AccountPage = () => {
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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
      setData((prevData) => prevData.map((item, i) => (i === editIndex ? newData : item)));
    } else {
      setData((prevData) => [...prevData, newData]);
    }
    setIsFormOpen(false);
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Row className="w-100 p-2">
        
      </Row>

      <Row className="table-container">
        <Col xs={12} className="table-responsive">
          <AccountList data={data} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />
        </Col>
      </Row>

      {isFormOpen && (
        <AccountForm
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
          initialData={editIndex !== null ? data[editIndex] : null}
        />
      )}
    </Container>
  );
};

export default AccountPage;
