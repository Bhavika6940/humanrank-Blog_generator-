import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");
export const removeUser = () => localStorage.removeItem("user");

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const setUser = (user) => 
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    const axiosInstance = axios.create({
        baseURL : API_BASE_URL,
        headers : {
            "Content-Type" : "application/json",
        },
    });

    axiosInstance.interceptors.request.use((config) => {
        const token = getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

export const loginUser = async (email , password) => {
    const res = await axios.post(`${API_BASE_URL}/api/user/login` , {
        email,
        password
    });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
}

export const logoutUser = () => {
    removeToken();
    removeUser();
};

export default axiosInstance;