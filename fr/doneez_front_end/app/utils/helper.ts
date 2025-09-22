import { jwtDecode, JwtPayload } from "jwt-decode";

export const setStorage = (key: string, value: string | null): void => {
    if (typeof window !== 'undefined') {
        // Code is running in the browser, safe to use localStorage
        if (value) {
            localStorage.setItem(key, value);
        } else {
            localStorage.removeItem(key);
        }
    }
};
export const getStorage = (key: string): string | null => {
    if (typeof window !== 'undefined') {
        // Code is running in the browser, safe to use localStorage
        return localStorage.getItem(key);
    }
    // Code is running on the server, localStorage is not available
    return null;
};

export const isTokenExpired = (token: string | null | undefined):boolean => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (typeof decodedToken.exp !== 'number') {
        // If 'exp' is not present or not a number, consider the token expired
        return true;
      }
  
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
};