import { jwtDecode } from "jwt-decode";

interface JWTResponse {
    role: string;
    userName: string;
    id: string;
    exp: number;
}

export function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    try {
      const decoded = jwtDecode<JWTResponse>(token);
      const currentTime = Date.now() / 1000;
  
      // Si el token ha expirado, no hagas la llamada a la API
      if (decoded.exp <= currentTime) {
        return false;
      }

      return true;
    } catch (e) {
      console.error("Error during token validation:", e);
      return false;
    }
}

// Esta función obtiene el rol del usuario desde el token JWT
export const getUserRole = (token: string): string => {
    try {
        const decoded = jwtDecode<JWTResponse>(token);
        if (decoded.role === '4') {
            localStorage.setItem('roleValue', decoded.role)
        }
        return decoded.role;
    } catch (e) {
        console.error("Error decoding token:", e);
        return '';
    }
};

export const getUserId = (token: string): string => {
    try {
        const decoded = jwtDecode<JWTResponse>(token);
        return decoded.id;
    } catch (e) {
        console.error("Error decoding token:", e);
        return '';
    }
};