import PropTypes from "prop-types";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";


function TemplateVoucher({voucher, setShowVoucher}) {
    const contentRef = useRef({});
    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef,
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
            setShowVoucher(false);
        }
    });

    const convertDate = (date) => {
        const dateObj = new Date(date);
        return `Ngày ${dateObj.getDate()} tháng ${dateObj.getMonth() + 1} năm ${dateObj.getFullYear()}`;
    }

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    }

    const convertNumberToWords = (number) => {
        if (number === 0) return "không";
        
        const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
        const teens = ['', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'];
        const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
        
        const readThreeDigits = (num) => {
            let result = '';
            const hundred = Math.floor(num / 100);
            const remainder = num % 100;
            
            if (hundred > 0) {
                result += units[hundred] + ' trăm ';
                
                if (remainder > 0 && remainder < 10) {
                    result += 'lẻ ';
                }
            }
            
            if (remainder > 0) {
                if (remainder < 10) {
                    result += units[remainder];
                } else if (remainder < 20) {
                    result += teens[remainder - 10];
                } else {
                    const ten = Math.floor(remainder / 10);
                    const unit = remainder % 10;
                    result += tens[ten];
                    
                    if (unit > 0) {
                        if (unit === 1) {
                            result += ' mốt';
                        } else if (unit === 5) {
                            result += ' lăm';
                        } else {
                            result += ' ' + units[unit];
                        }
                    }
                }
            }
            
            return result.trim();
        };
        
        const groups = [];
        let temp = number;
        
        while (temp > 0) {
            groups.push(temp % 1000);
            temp = Math.floor(temp / 1000);
        }
        
        const largeUnits = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];
        
        let result = '';
        for (let i = groups.length - 1; i >= 0; i--) {
            if (groups[i] > 0) {
                result += readThreeDigits(groups[i]) + ' ' + largeUnits[i] + ' ';
            }
        }
        
        return result.trim();
    };

    return (  
        <div className="d-none">
            <button id="printVoucherButton" onClick={() => reactToPrintFn()} className="d-none">In</button>
            <div>
                <div id="printSection" ref={contentRef} style={{ width: '1200px', padding: '20px' }}>
                    <div className="p-4 position-relative">
                        <div className="row mb-3">
                            <div className="col-8">
                                <p className="fw-bold mb-1">Đơn vị: CÔNG TY CỔ PHẦN VACOM</p>
                                <p className="small">Địa chỉ: Số 100 HN, phố Tân Lập, Phường Phúc Xá, Quận Ba Đình, Hà Nội</p>
                            </div>
                            <div className="col-4 text-center">
                                <p className="fw-bold mb-1">Mẫu số 01 - TT</p>
                                <i className="small">(Ban hành theo thông tư 133/2016/TT-BTC ngày 26/08/2016 của Bộ Tài chính)</i>
                                <div className="d-flex flex-column text-start" style={{marginLeft:'70px'}}>
                                    <div className="text-start">
                                        <p className="small mb-0">Quyển số:...........</p>
                                    </div>
                                    {voucher.details.map((detail) => (
                                        <>
                                            <div className="d-flex justify-content-between">
                                                <p className="small mb-0">Nợ:<span className="ms-4"></span>{detail.accountDebitCode}</p>
                                                <p className="small mb-0">{formatAmount(detail.amount)}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p className="small mb-0">Có:<span style={{margin:'0 13px'}}></span>{detail.accountCreditCode}</p>
                                                <p className="small mb-0">{formatAmount(detail.amount)}</p>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="text-center position-absolute start-50 translate-middle" style={{top: `${voucher.details.length * 50 + 110}px`}}>
                            <h4 className="fw-bold mb-0">{voucher.voucherType == "PHIEU_THU" ? 'PHIẾU THU' : 'PHIẾU CHI'}</h4>
                            <p className="mb-0">{convertDate(voucher.voucherDate)}</p>
                            <p className="fw-bold">Số hiệu: {voucher.voucherNumber}</p>
                        </div>

                        <div className="mb-4 position-relative" style={{marginTop: `${voucher.details.length * 50}px`}}>
                            <div className="mb-0 d-flex">
                                <div>Họ và tên người nộp tiền:</div>
                                <span className="ms-3"></span>
                                <div>Nghiêm Quang Thắng</div>
                            </div>
                            <div className="d-flex mb-0">
                                <div>Tên công ty:</div>
                                <span className="ms-3"></span>
                                <p className="fw-bold mb-0 pb-0">{voucher.entityName}</p>
                            </div>
                            <div className="d-flex mb-1 flex-wrap">
                                <div style={{ flexShrink: 0 }}>Địa chỉ:</div>
                                <span className="ms-3"></span>
                                <p className="mb-0 pb-0" style={{ overflowWrap: 'break-word', flex: '1' }}>
                                    {voucher.address}
                                </p>
                            </div>

                            <div className="d-flex mb-1">
                                <div>Lý do:</div>
                                <span className="ms-3"></span>
                                <p className="mb-0">Phiếu thu tiền</p>
                            </div>
                            <div className="row mb-2">
                                <div className="col-3">
                                    Số tiền: <span className="ms-3"></span>                         
                                    <span className="fw-bold">{formatAmount(voucher.totalAmount)} VNĐ</span>
                                </div>
                                
                                <div className="col-9">
                                    <span>(Viết bằng chữ): <i style={{textTransform: 'capitalize'}}>{convertNumberToWords(voucher.totalAmount)}.</i></span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-3">Kèm theo:</div>
                                <div className="col-9">Chứng từ gốc:</div>
                            </div>
                        </div>

                        <div className="row text-center mt-5">
                            <div className="col">
                                <p className="fw-bold mb-0">Giám Đốc</p>
                                <i className="small">(Ký,họ tên,đóng dấu)</i>
                            </div>
                            <div className="col">
                                <p className="fw-bold mb-0">Kế toán trưởng</p>
                                <i className="small">(Ký,họ tên)</i>
                            </div>
                            <div className="col">
                                <p className="fw-bold mb-0">Người nộp tiền</p>
                                <i className="small">(Ký,họ tên)</i>
                            </div>
                            <div className="col">
                                <p className="fw-bold mb-0">Người lập phiếu</p>
                                <i className="small">(Ký,họ tên)</i>
                            </div>
                            <div className="col">
                                <p className="fw-bold mb-0">Thủ quỹ</p>
                                <i className="small">(Ký,họ tên)</i>
                            </div>
                        </div>

                        <div className="mt-5" style={{paddingTop:'100px'}}>
                            <p className="mb-1">Đã nhận đủ số tiền (viết bằng chữ): ........................................................................................................................................................................................................................................................</p>
                            <p className="mb-1">+ Tỷ giá ngoại tệ (vàng, bạc, đá quý): ....................................................................................................................................................................................................................................................</p>
                            <p className="mb-1">+ Tỷ giá quy đổi: .............................................................................................................................................................................................................................................................................................</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

TemplateVoucher.propTypes = {
  setShowVoucher: PropTypes.func,
  voucher: PropTypes.shape({
    entityName: PropTypes.string,
    voucherDate: PropTypes.string,
    voucherNumber: PropTypes.string,
    totalAmount: PropTypes.number,
    voucherType: PropTypes.string,
    address: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.shape({
        accountCreditCode: PropTypes.string,
        accountDebitCode: PropTypes.string,
        amount: PropTypes.number,
    })),
  }),
};

export default TemplateVoucher;