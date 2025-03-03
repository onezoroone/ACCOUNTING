import Card from "../components/Card";
import Chart, { Chart2, Chart3 } from "../components/Chart";


function DashboardPage() {
    return (  
        <>
        <div className="row">
            <div className="col-sm-12">
              <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <div>
                  <p className="text-small text-dark mb-1">DASHBOARD / ACCOUNTING</p>
                  <h4 className="font-weight-bold mb-0">Welcome to Dashboard</h4>
                </div>
                <div>
                  <button type="button" className="btn btn-link text-muted"><i className="mdi mdi-file-excel"></i>Export to Excel</button>
                  <button type="button" className="btn btn-link text-muted"><i className="mdi mdi-file-pdf"></i>Export to PDF</button>
                </div>
              </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                    <Card icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-auto" viewBox="0 0 16 16">
                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
                                </svg>}
                        title={`Tổng tiền mặt`}
                        style="bg-primary"
                        value={`10 triệu`} />
                    <Card icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-auto" viewBox="0 0 16 16">
                                    <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"/>
                                </svg>}
                        title={`Tổng tiền gửi`}
                        style="bg-success"
                        value={`100 triệu`} />
                    <Card icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-auto" viewBox="0 0 16 16">
                                    <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595m7.173 3.876a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199m-8.999-.65a.5.5 0 1 1-.276-.96A7.6 7.6 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.6 6.6 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"/>
                                </svg>}
                        title={`Tổng tiền phải thu`}
                        style="bg-info"
                        value={`20 củ`} />
                    <Card icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ms-auto" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
                                </svg>}
                        title={`Tổng tiền phải chi`}
                        style="bg-danger"
                        value={`10 củ`} />
                </div>
                <div className="row">
                    <div className="col-sm-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body d-flex justify-content-center">
                                <Chart2 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="row">
                    <div className="col-sm-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <Chart />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <Chart3 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default DashboardPage;