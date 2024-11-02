const API_BASE_URL = 'https://final-back-end-yevq.vercel.app/api/auth';

export const fetchUserById = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`);
  const data = await response.json();
  return data.user;
}