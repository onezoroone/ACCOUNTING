import axios from 'axios';

const API_URL = '/vouchers'; // Thay đổi URL tùy thuộc vào cấu hình của bạn

// Tạo chứng từ mới
const createVoucher = async (voucherData) => {
    const response = await axios.post(API_URL, voucherData);
    return response.data;
  };
  
  export default {
    createVoucher,
  };