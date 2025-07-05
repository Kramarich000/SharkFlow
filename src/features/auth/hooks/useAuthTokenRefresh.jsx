import { useEffect, useState } from 'react';
import { refreshToken } from '@features/auth';

export function useAuthTokenRefresh() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshToken();
      } finally {
        setIsAuthLoading(false);
      }
    };

    refresh();
  }, []);

  return { isAuthLoading };
}
