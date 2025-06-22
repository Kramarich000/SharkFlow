import { useEffect, useState } from 'react';
import { useAuthStore } from 'features/auth/store/authStore';
import { refreshToken } from 'features/auth/api/refreshToken';

export function useAuthTokenRefresh() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshToken(setAccessToken);
      } finally {
        setIsAuthLoading(false);
      }
    };

    refresh();
  }, [setAccessToken]);

  return { isAuthLoading };
}
