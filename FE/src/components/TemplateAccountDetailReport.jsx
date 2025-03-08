import PropTypes from "prop-types";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function TemplateAccountDetailReport({ data, setShow, startDate, endDate, accountCodes }) {
    const contentRef = useRef({});
    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef,
        documentTitle: 'BÁO CÁO CHI TIẾT TÀI KHOẢN',
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

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    }
    
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
                                <p className="fw-bold mb-1">Mẫu số S38 - DN</p>
                                <i className="small">(Ban hành theo thông tư 133/2016/TT-BTC ngày 26/08/2016 của Bộ Tài chính)</i>
                            </div>
                        </div>
                        <div className="text-center mb-2" >
                            <h2 className="fw-bold mb-1">SỔ CHI TIẾT TÀI KHOẢN</h2>
                            <p className="mb-0 fw-bold">Từ ngày {startDate.toLocaleDateString('vi-VN')} đến ngày {endDate.toLocaleDateString('vi-VN')}</p>
                            <p className="mb-0 fw-bold small">
                                {accountCodes.length && `Tài khoản: ${accountCodes.map((item) => item.value).join(", ")} - ${accountCodes.map((item) => item.label).join(", ")}` }
                            </p>
                        </div>
                        <div className="text-end">
                            <p className="mb-0">Đơn vị tính: VND</p>
                        </div>
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th colSpan="2">Chứng từ</th>
                                    <th rowSpan="2" className="align-middle">Lý do</th>
                                    <th rowSpan="2" className="align-middle">TK đối ứng</th>
                                    <th colSpan="2">Số phát sinh trong kỳ</th>
                                    <th colSpan="2">Số dư</th>
                                </tr>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Số hiệu</th>
                                    <th>Nợ</th>
                                    <th>Có</th>
                                    <th>Dư Nợ</th>
                                    <th>Dư Có</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="fw-bold">Số dư đầu kỳ</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{new Date(item.date).toLocaleDateString('vi-VN')}</td>
                                        <td>{item.voucherNumber}</td>
                                        <td>{item.description}</td>
                                        <td>{item.oppositeAccount}</td>
                                        <td>{formatAmount(item.debitAmount)}</td>
                                        <td>{formatAmount(item.creditAmount)}</td>
                                        <td>{formatAmount(item.debitBalance)}</td>
                                        <td>{formatAmount(item.creditBalance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <p className="mb-0">Sổ này có {Math.ceil(data.length / 20)} trang, đánh số từ trang 1 đến trang {Math.ceil(data.length / 20)}</p>
                            <p>Ngày mở sổ: {new Date().toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div className="row mb-3 mt-4">
                            <div className="col-8"></div>
                            <div className="col-4 text-center">
                                <p className="mb-0">Ngày ......... tháng ......... năm ..........</p>
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

TemplateAccountDetailReport.propTypes = {
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
    date: PropTypes.string,
  })),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  accountCodes: PropTypes.array,
};

export default TemplateAccountDetailReport;