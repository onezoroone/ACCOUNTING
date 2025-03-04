import { useState } from "react";
import axiosClient from "./libs/axios-client";
import useSessionStorage from "./hooks/useSessionStorage";
function App() {

  const [value, setValue]= useState({
    username: '',
    password: ''
  });
  const [, setToken] = useSessionStorage('token', '');
  const [, setUser] = useSessionStorage('user', '');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axiosClient.post('/auth/login', value)
    .then(res => {
      setToken(res.data.token);
      setUser(res.data.username);
      window.location.href = '/';
    })
    .catch(err => {
      alert(err.response.data.errorMessage);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="page-login-wrapper">
      <div className="content-wrapper">
        <div className="mx-auto">
          <div className="body-content">
            <h5>Chào mừng đến với phần mềm kế toán!</h5>
            <p style={{fontSize:'1rem'}}>Đăng nhập để tiếp tục.</p>
            <form className="pt-3" onSubmit={handleLogin}>
              <div className="form-group">
                <input type="text" required="" className="form-control form-control-lg" placeholder="Tài khoản" value={value.username} name="username" onChange={handleChange} />
              </div>
              <div className="form-group">
                <input type="password" required="" autoComplete="current-password" className="form-control form-control-lg" placeholder="Mật khẩu" value={value.password} name="password" onChange={handleChange} />
              </div>
              <div className="mt-3 d-flex justify-content-center ">
                <button className="btn btn-primary" type="submit" data-pc-name="button" disabled={loading}>
                  {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
