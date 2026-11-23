import type { ReactNode } from 'react'

export type LoginCredentials = {
    email: string,
    password: string
}

export type RegisterCredentials = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
};

export type JWTDecode = {
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    role: 'admin' | 'chauffeur';
    iat: number;
    exp: number;
}

export type LoginProps = {
    onLogin: (user: JWTDecode) => void;
}

export type AuthContextType =  {
    user: JWTDecode | null;
    login: (user: JWTDecode) => void;
    logout: () => void;
};

export type AuthProviderProps = {
    children: ReactNode
}