import { api } from "@/shared/api/axios-client.js";


export const fetchSession = async () => {
  const token = localStorage.getItem('token')
  const response = await api.get('/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': "true"
    }
  });
  return response.data
}

export const logoutSession = async (navigate) => {
  localStorage.clear();
  navigate('/auth')
}