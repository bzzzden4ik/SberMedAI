import { api } from "@/shared/api/axios-client.js";


export const fetchSession = async () => {
  const response = await api.get('/auth/me');
  return response.data
}

export const logoutSession = async () => {
  await api.get('/auth/logout')
}