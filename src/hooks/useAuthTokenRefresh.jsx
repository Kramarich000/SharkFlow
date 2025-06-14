import { useEffect, useState } from 'react';
import api from '@api/http/http';
import { useAuthStore } from '@store/authStore';

export function useAuthTokenRefresh() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    async function refreshToken() {
      try {
        const response = await api.post('/refresh');
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        api.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        console.log('[REFRESH] Token восстановлен при монтировании');
      } catch (err) {
        console.warn(
          '[REFRESH] Ошибка при первичном восстановлении токена:',
          err,
        );
        setAccessToken(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    refreshToken();
  }, [setAccessToken]);

  return { isAuthLoading };
}
