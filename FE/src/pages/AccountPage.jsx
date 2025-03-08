import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";
import axiosClient from "../libs/axios-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const sortAccountCodes = (data) => {
  const sortedData = [...data];
  
  const isParentOf = (parent, child) => {
    return child.accountCode.startsWith(parent.accountCode) && 
           child.accountCode.length > parent.accountCode.length;
  };
  
  sortedData.sort((a, b) => {
    if (isParentOf(a, b)) return -1;
    
    if (isParentOf(b, a)) return 1;
    
    return a.accountCode.localeCompare(b.accountCode);
  });
  
  return sortedData;
};

const AccountPage = () => {
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  // khai báo 1 biến để mỗi lần thêm sửa xóa xong thì gọi lại api lấy danh sách mới
  const [reload, setReload] = useState(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // lấy danh sách tài khoản từ api
    const fetchData = async () => {
      await axiosClient.get('/master-data/accounts')
        .then((res) => {
          const sortedData = sortAccountCodes(res.data);
          setData(sortedData);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    fetchData();
  }, [reload]);

  // hàm mở modal thêm mới
  const handleAdd = () => {
    setEditIndex(null);
    setIsFormOpen(true);
  };

  // hàm mở modal chỉnh sửa
  const handleEdit = (index) => {
    setEditIndex(index);
    setIsFormOpen(true);
  };

  // hàm xóa tài khoản
  const handleDelete = async (item) => {
    MySwal.fire({
      title: 'Xác nhận xóa',
      text: `Bạn có chắc chắn muốn xóa tài khoản ${item.accountName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // gọi api xóa tài khoản
        await axiosClient.delete(`/master-data/accounts/${item.id}`)
        .then(() => {
          // hiển thị thông báo thành công
          MySwal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Xóa tài khoản thành công!',
          });

          // gọi lại api lấy danh sách mới
          setReload(!reload);
        })
        .catch(() => {
          // hiển thị thông báo lỗi
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Có lỗi xảy ra khi xóa tài khoản!',
          });
        });
      }
    });
  };


  // hàm xử lý submit form
  const handleSubmit = async (newData) => {
    // nếu editIndex !== null thì sửa, ngược lại thì thêm mới
    if (editIndex !== null) {
      // gọi api sửa tài khoản
      await axiosClient.put(`/master-data/accounts/${newData.id}`, newData)
      .then(() => {
        // hiển thị thông báo thành công
        MySwal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Sửa tài khoản thành công!',
        });

        // đóng form và gọi lại api lấy danh sách mới
        setIsFormOpen(false);
        setReload(!reload);
      })
      .catch(() => {
        // hiển thị thông báo lỗi
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Có lỗi xảy ra khi sửa tài khoản!',
        });
      });
    }else {
      // gọi api thêm mới tài khoản
      await axiosClient.post('/master-data/accounts', newData)
      .then(() => {
        // hiển thị thông báo thành công
        MySwal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Thêm mới tài khoản thành công!',
        });

        // đóng form và gọi lại api lấy danh sách mới
        setIsFormOpen(false);
        setReload(!reload);
      })
      .catch(() => {
        // hiển thị thông báo lỗi
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Có lỗi xảy ra khi thêm mới tài khoản!',
        });
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
    </div>
  );
};

export default AccountPage;
