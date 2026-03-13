import axios from 'axios';

import { getToken } from '@/shared/lib/Token';

const uploadApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  timeout: 30000,
});

// 요청 인터셉터
uploadApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export { uploadApi };
