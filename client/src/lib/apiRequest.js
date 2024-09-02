import axios from 'axios';

const apiRequest=axios.create({
    baseURL:"https://housey-2.onrender.com/",
    withCredentials:true
})

export default apiRequest;
