import type { Role } from "@/enums/globaEnums";
import { sessionExpiredModal } from "@/services/sweetAlert.service";
import { jwtDecode } from "jwt-decode";

interface JWTResponse {
    role: string;
    userName: string;
    id: string;
    exp: number;
    teamId: number;
}

export function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    try {
        const decoded = jwtDecode<JWTResponse>(token);
        const currentTime = Date.now() / 1000;

        // Si el token ha expirado, no hagas la llamada a la API
        if (decoded.exp <= currentTime) {
            sessionExpiredModal('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.')
            localStorage.removeItem('authToken');
            return false;
        }

        return true;
    } catch (e) {
        console.error("Error during token validation:", e);
        return false;
    }
}

export function isAuthorized(requiredRoles: Role[]) {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    try {
        const userRole = getUserRole();
        if (requiredRoles.includes(+userRole)) {
            return true
        }
        return false;
    } catch (e) {
        console.error("Error during token validation:", e);
        return false;
    }
}

// Esta función obtiene el rol del usuario desde el token JWT
export const getUserRole = (): string => {
    try {
        const token = localStorage.getItem('authToken');
        const decoded = jwtDecode<JWTResponse>(token!);
        return decoded.role;
    } catch (e) {
        console.error("Error decoding token:", e);
        return '';
    }
};

export const getUserId = (): string => {
    try {
        const token = localStorage.getItem('authToken');
        const decoded = jwtDecode<JWTResponse>(token!);
        return decoded.id;
    } catch (e) {
        console.error("Error decoding token:", e);
        return '';
    }
};

export const getTeamId = (): number => {
    try {
        const token = localStorage.getItem('authToken');
        const decoded = jwtDecode<JWTResponse>(token!);
        return decoded.teamId;
    } catch (e) {
        console.error("Error decoding token:", e);
        return 0;
    }
};