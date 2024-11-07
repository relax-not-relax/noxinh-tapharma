import axios from 'axios';

// Tạo instance của Axios
const axiosClient = axios.create({
    baseURL: 'http://localhost:5004',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho request
axiosClient.interceptors.request.use(
    (config) => {
        // Lấy token từ local storage hoặc state
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor cho response
axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Xử lý lỗi, ví dụ nếu token hết hạn
        if (error.response && error.response.status === 401) {
            // Xử lý logout hoặc làm mới token
            console.log("Unauthorized! Redirecting to login...");
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
