import { createContext, useState } from 'react';
import type {AuthContextType, AuthProviderProps, JWTDecode} from '../types/auth.types';


export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<JWTDecode | null>(() => {
        const savedUser = sessionStorage.getItem('user');

        return savedUser ?  JSON.parse(savedUser): null;
    })

    const login = (user: JWTDecode) => {
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user))
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}