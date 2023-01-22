import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Content_Type = "application/json";
    config.headers.Accept = "application/json";
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;

            if (response && response.status == 401) {
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error(error);
        }

        throw error;
    }
);

export default axiosClient;
