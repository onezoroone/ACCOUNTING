import axios from "axios";

<<<<<<< HEAD
const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api"
});

axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient;
=======
const API_BASE_URL = "http://localhost:8080/api/master-data/entity-groups"; // Thay bằng URL thực tế của bạn

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Lấy danh sách nhóm đối tượng
export const fetchEntityGroups = async () => {
  const response = await api.get("/");
  return response.data;
};

// Thêm nhóm đối tượng
export const createEntityGroup = async (data) => {
  const response = await api.post("/", data);
  return response.data;
};

// Cập nhật nhóm đối tượng
export const updateEntityGroup = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

// Xóa nhóm đối tượng
export const deleteEntityGroup = async (id) => {
  await api.delete(`/${id}`);
};
>>>>>>> f894eef (update)
