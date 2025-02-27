function App() {

  return (
    <div className="page-login-wrapper">
      <div className="content-wrapper">
        <div className="mx-auto">
          <div className="body-content">
            <h5>Chào mừng đến với phần mềm kế toán!</h5>
            <p style={{fontSize:'1rem'}}>Đăng nhập để tiếp tục.</p>
            <form action="" className="pt-3">
              <div className="form-group">
                <input type="text" required="" className="form-control form-control-lg" placeholder="Tài khoản" value="" />
              </div>
              <div className="form-group">
                <input type="password" required="" autoComplete="current-password" className="form-control form-control-lg" placeholder="Mật khẩu" value="" />
              </div>
              <div className="mt-3 d-flex justify-content-center ">
                <button className="btn btn-primary" type="submit" data-pc-name="button" data-pc-section="root">ĐĂNG NHẬP</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
