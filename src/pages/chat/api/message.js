import { api } from '@/shared/api/axios-client.js'

export const getAnswer = async (message, chat_id) => {
    const res = await api.post(`/api/${chat_id}/answer`, {message})
    return res.body
}