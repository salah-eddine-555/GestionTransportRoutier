import {API_ENDPOINTS, apiFetch} from './api';

import type {CreateRemorque, UpdateRemorque, Remorque, RemorqueResponse} from '../types/remorque.types';


export const getAllRemorques = async(): Promise<Remorque[]> => {

    const  res = await apiFetch(API_ENDPOINTS.remorque.getAll);

    if(!res.ok) {throw new Error("erreur lorsque recuperation des remorques ")}

    return res.json();
}

export const getRemorqueById = async(id: string): Promise<Remorque> => {

    const res = await apiFetch(API_ENDPOINTS.remorque.getById(id));

    if(!res.ok) {throw new Error("erreur lorsque recuperation de cette remorque")}

    return res.json();

}

export const createRemorqueRequest = async(data: CreateRemorque): Promise<RemorqueResponse> => {

    const res = await apiFetch(API_ENDPOINTS.remorque.create, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!res.ok) {throw new Error("errur lorsque creation de remorque")}

    return res.json();
}

export const updateRemorqueRequest = async(id: string, data: UpdateRemorque): Promise<RemorqueResponse> => {

    const res = await apiFetch(API_ENDPOINTS.remorque.update(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!res.ok) {throw new Error("errur lorsque la mis a jour de cette remorque")}

    return res.json();
}

export const archiveRemorque  = async(id: string) : Promise<{message: string}> => {
    const res = await apiFetch(API_ENDPOINTS.remorque.delete(id), {method: 'DELETE'});

    if(!res.ok) {throw new Error("errur de suppression cette remorque")}

    return res.json();
}