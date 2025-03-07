import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../libs/axios-client";

interface Voucher {
    id: number;
    voucherNumber: string;
    voucherDate: string;
    entityCode: string;
    entityName: string;
    totalAmount: number;
    currencyCode: string;
    details: VoucherDetail[];
}

interface VoucherDetail {
    accountCreditCode: string;
    accountDebitCode: string;
    amount: number;
}

function VouchersPage() {
    const [data, setData] = useState<Voucher[]>([]);
    const [currentPagination, setCurrentPagination] = useState(0);
    const [totalPagination, setTotalPagination] = useState(1);
    const [currentVoucher, setCurrentVoucher] = useState<Voucher | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            await axiosClient.get("/vouchers").then((res) => {
                setData(res.data.content);
                setTotalPagination(res.data.totalPages);
            });
        }
        fetchData();
    }, []);

    const formatDateTime = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString();
    }

    const formartCurrency = (currency: number) => {
        return currency.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    }
    return (
        <div className="container mt-3">
          {/* Tiêu đề và dropdown thêm mới */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="m-0">Quản lý chứng từ</h5>
            <div className="dropdown">
              <button 
                className="btn btn-info dropdown-toggle text-white" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Thêm mới
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <Link className="dropdown-item" to="/receipt">Phiếu thu</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/payment">Phiếu chi</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/othervoucher">Phiếu kế toán khác</Link>
                </li>
              </ul>
            </div>
          </div>
    
          {/* Bảng quản lý chứng từ */}
          <table className="table table-bordered text-center table-hover">
            <thead className="table-primary">
              <tr>
                <th>Số CT</th>
                <th>Ngày CT</th>
                <th>Mã CT</th>
                <th>Mã đối tượng</th>
                <th>Tên đối tượng</th>
                <th>Tổng tiền</th>
                <th>Ngoại tệ</th>
                <th>Người lập</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.map((voucher) => (
                <tr style={{cursor:'pointer'}} key={voucher.id} onClick={() => setCurrentVoucher(voucher)}>
                  <td>{voucher.voucherNumber}</td>
                  <td>{formatDateTime(voucher.voucherDate)}</td>
                  <td></td>
                  <td>{voucher.entityCode}</td>
                  <td>{voucher.entityName}</td>
                  <td>{formartCurrency(voucher.totalAmount)}</td>
                  <td>{voucher.currencyCode}</td>
                  <td></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary mx-1">✏️</button>
                    <button className="btn btn-sm btn-outline-danger">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Chi tiết */}
          <h5 className="mt-4">Chi tiết chứng từ</h5>
          <table className="table table-bordered text-center">
            <thead className="table-primary">
              <tr>
                <th>TK nợ</th>
                <th>TK có</th>
                <th>Mã đối tượng</th>
                <th>Tên đối tượng</th>
                <th>Tổng tiền</th>
                <th>Thành tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentVoucher && currentVoucher.details.map((detail, index) => (
                <tr key={index}>
                    <td>{detail.accountCreditCode}</td>
                    <td>{detail.accountDebitCode}</td>
                    <td>{currentVoucher.entityCode}</td>
                    <td>{currentVoucher.entityName}</td>
                    <td>{formartCurrency(detail.amount)}</td>
                    <td></td>
                    <td>
                    <button className="btn btn-sm btn-outline-primary mx-1">✏️</button>
                    <button className="btn btn-sm btn-outline-danger">🗑️</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Nút Lọc và In */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary mx-1">Lọc</button>
            <button className="btn btn-secondary">In</button>
          </div>
        </div>
      );
}

export default VouchersPage;