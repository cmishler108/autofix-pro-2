import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStorage, removeStorage, isTokenExpired } from '@/app/utils/helper';

export default function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = getStorage('access_token');
    const userStr = getStorage('user');
    let validUser = null;

    if (userStr && accessToken && !isTokenExpired?.(accessToken)) {
      try {
        validUser = JSON.parse(userStr);
        setUser(validUser);
        setLoading(false);
      } catch {
        setUser(null);
        setLoading(false);
      }
    } else {
      // Remove all tokens if invalid/expired
      removeStorage('access_token');
      removeStorage('refresh_token');
      removeStorage('user');
      setUser(null);
      setLoading(false);
      // Only redirect if not already on /sign-in
      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== '/sign-in'
      ) {
        router.replace('/sign-in');
      }
    }
  }, [router]);

  const logout = () => {
    removeStorage('access_token');
    removeStorage('refresh_token');
    removeStorage('user');
    setUser(null);
    router.push('/sign-in');
  };

  return { user, loading, logout };
}