import axios from 'axios';

const apiRequest = axios.create({
    baseURL: "https://housey-6f1v.onrender.com/api",
    withCredentials: true,
});

// Add a request interceptor to include the JWT token in every request
apiRequest.interceptors.request.use(config => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiRequest;
