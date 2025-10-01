import axios from "axios"

const getAllUsersApi = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`
    return axios.get(url);
}

const getUserByIdApi = (id: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`
    return axios.get(url);
}


const createUserApi = (name: string, email: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`
    return axios.post(url, { name, email });
}

const updateUserApi = (id: number, name: string, email: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`
    return axios.put(url, { id, name, email });
}

const deleteUserApi = (id: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`
    return axios.delete(url);
}


const getHomeApi = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/hello`
    return axios.get(url);
}

// để dùng được nhiều nơi
export {
    getAllUsersApi,
    createUserApi,
    deleteUserApi,
    updateUserApi,
    getUserByIdApi,
    getHomeApi
}