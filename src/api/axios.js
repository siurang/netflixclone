import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: "044f89436cf0116687e244f81a77f937",
        language: "ko-KR",
    },
});

export default instance;