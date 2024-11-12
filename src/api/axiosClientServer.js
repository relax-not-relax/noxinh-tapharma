import axios from 'axios';

// Tạo instance của Axios
const axiosClientServer = axios.create({
    baseURL: 'http://150.95.115.166:7654/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho request
axiosClientServer.interceptors.request.use(
    (config) => {
        const altToken = sessionStorage.getItem("refreshTokenNoxinh");
        const token = sessionStorage.getItem('accessTokenNoxinh');

        if (config.useAltToken && altToken) {
            config.headers.Authorization = `Bearer ${altToken}`;
        } else if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor cho response
axiosClientServer.interceptors.response.use(
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

export default axiosClientServer;
