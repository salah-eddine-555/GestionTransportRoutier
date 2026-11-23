import {API_ENDPOINTS} from './api';
import {jwtDecode } from 'jwt-decode';
import type {LoginCredentials, RegisterCredentials, JWTDecode} from '../types/auth.types';



export const register = async(data: RegisterCredentials) => {

    const res = await fetch(API_ENDPOINTS.auth.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(!res.ok){
        throw new Error("Register failed");
    }
    return await res.json();
}

export const login = async(data: LoginCredentials)=> {

    const res = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data) 
    });

    if(!res.ok){ throw new Error("Login filed")}
    const result = await res.json();
   

    //  console.log(user); return;
    return result.user;
}