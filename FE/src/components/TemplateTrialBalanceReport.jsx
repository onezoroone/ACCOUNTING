import PropTypes from "prop-types";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function TemplateTrialBalanceReport({data, setShow, startDate, endDate}) {
    const contentRef = useRef({});
    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef,
        documentTitle: 'BÁO CÁO SỔ CÂN ĐỐI PHÁT SINH',
        pageStyle: `
            @page {
                size: landscape;
                margin: 0mm;
            }
            @media print {
                html, body {
                    margin: 0 !important;
                    padding: 0 !important;
                    background-color: transparent !important;
                }
                
                body * {
                    visibility: hidden;
                }
                
                #printSection, #printSection * {
                    visibility: visible;
                }
                
                header, footer, nav, aside, .no-print {
                    display: none !important;
                }
            }
        `,
        onBeforeGetContent: () => {
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setShow(false);
        }
    });
    
    return (  
        <div className="d-none">
            <button id="print" onClick={() => reactToPrintFn()} className="d-none">In</button>
            <div>
                <div id="printSection" ref={contentRef} style={{ width: '1200px', padding: '20px' }}>
                    <div className="p-4 position-relative">
                        <div className="row mb-3">
                            <div className="col-8">
                                <p className="fw-bold mb-1">CÔNG TY CỔ PHẦN VACOM</p>
                                <i className="small">Số 100 HN, phố Tân Lập, Phường Phúc Xá, Quận Ba Đình, Hà Nội</i>
                            </div>
                            <div className="col-4 text-center">
                                <p className="fw-bold mb-1">Mẫu số S06 - DN</p>
                                <i className="small">(Ban hành theo thông tư 133/2016/TT-BTC ngày 26/08/2016 của Bộ Tài chính)</i>
                            </div>
                        </div>
                        <div className="text-center mb-1" >
                            <h4 className="fw-bold mb-1">BẢNG CÂN ĐỐI SỔ PHÁT SINH</h4>
                            <p className="mb-0">Từ ngày {startDate} đến ngày {endDate}</p>
                        </div>
                        <div className="text-end">
                            <p>Đơn vị tính: VND</p>
                        </div>
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th rowSpan="2" className="align-middle">Số hiệu TK</th>
                                    <th rowSpan="2" className="align-middle">Tên tài khoản</th>
                                    <th colSpan="2">Số dư đầu kỳ</th>
                                    <th colSpan="2">Phát sinh trong kỳ</th>
                                    <th colSpan="2">Số dư cuối kỳ</th>
                                </tr>
                                <tr>
                                    <th>Nợ</th>
                                    <th>Có</th>
                                    <th>Nợ</th>
                                    <th>Có</th>
                                    <th>Nợ</th>
                                    <th>Có</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td>8</td>
                                </tr>
                                {data.map((item, index) => (
                                    <tr key={index} className={item.parentId ? '' : 'fw-bold'}>
                                        <td>{item.accountCode}</td>
                                        <td>{item.accountName}</td>
                                        <td>{item.debitOpening}</td>
                                        <td>{item.creditOpening}</td>
                                        <td>{item.debitTransaction}</td>
                                        <td>{item.creditTransaction}</td>
                                        <td>{item.debitClosing}</td>
                                        <td>{item.creditClosing}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="row mb-3 mt-4">
                            <div className="col-8"></div>
                            <div className="col-4 text-center">
                                <p className="mb-0">Ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 text-center">
                                <p className="fw-bold mb-0">Người ghi sổ</p>
                                <p className="small">(Ký, họ tên)</p>
                            </div>
                            <div className="col-4 text-center">
                                <p className="fw-bold mb-0">Kế toán trưởng</p>
                                <p className="small">(Ký, họ tên)</p>
                            </div>
                            <div className="col-4 text-center">
                                <p className="fw-bold mb-0">Giám đốc</p>
                                <p className="small">(Ký, họ tên, đóng dấu)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

TemplateTrialBalanceReport.propTypes = {
  setShow: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape({
    accountCode: PropTypes.string,
    accountName: PropTypes.string,
    debitOpening: PropTypes.string,
    creditOpening: PropTypes.string,
    debitTransaction: PropTypes.string,
    creditTransaction: PropTypes.string,    
    debitClosing: PropTypes.string,
    creditClosing: PropTypes.string,
  })),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default TemplateTrialBalanceReport;