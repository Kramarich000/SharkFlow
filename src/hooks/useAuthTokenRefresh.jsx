import { useEffect, useState } from 'react';
import api from '@api/http/http';
import { useAuthStore } from '@store/authStore';

export function useAuthTokenRefresh() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const accessToken = useAuthStore((state) => state.accessToken);
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

  useEffect(() => {
    if (!accessToken) {
      setIsAuthLoading(false);
      return;
    }

    const refreshToken = async () => {
      try {
        const response = await api.post('/refresh');
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        api.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        console.log('[REFRESH] Token обновлён по таймеру');
      } catch (err) {
        console.warn('[REFRESH] Ошибка автообновления токена:', err);
        setAccessToken(null);
      } finally {
        setIsAuthLoading((prev) => {
          if (prev) return false;
          return prev;
        });
      }
    };

    const jitter = Math.floor(Math.random() * 120_000);
    const refreshInterval = 14 * 60 * 1000 + jitter;

    const intervalId = setInterval(refreshToken, refreshInterval);

    return () => clearInterval(intervalId);
  }, [accessToken, setAccessToken]);

  return { isAuthLoading };
}
