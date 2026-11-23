import type { JWTDecode } from '../types/auth.types';
import type {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';

interface ProtectedRouteProps {
    user:  JWTDecode | null;
    allowedRoles : ("admin" | "chauffeur")[];
    children: ReactNode;

}

export default function ProtectedRoute({user, allowedRoles, children}: ProtectedRouteProps){

    if(!user){
        return <Navigate to="/login" replace />
    }

    if(!allowedRoles.includes(user.role)){
         return <Navigate to="/login" replace />
    }

    return <>{children}</>


}