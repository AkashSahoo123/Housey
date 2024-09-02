import axios from 'axios';

const apiRequest=axios.create({
    baseURL:"https://housey-6f1v.onrender.com/api",
    withCredentials:true
})

export default apiRequest;
