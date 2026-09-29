import { api } from "@/shared/api/axios-client.js";

export const sendLogin = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    return res.data
}

export const sendRegister = async (email, password) => {
    const res = await api.post('/auth/register', { email, password })
    return res.data
}