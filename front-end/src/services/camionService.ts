import {API_ENDPOINTS, apiFetch} from './api';

import type {Camion} from '../types/camion.types.ts';



export const getAll = async(): Promise<Camion[]> => {

    const res = await apiFetch(API_ENDPOINTS.camion.getAll);

    if(!res.ok){ throw new Error("Erreur lorsque la recuperation des camions")}

    return res.json();
}

export const getCamionById = async(id: string):  Promise<Camion> => {

    const res = await apiFetch(API_ENDPOINTS.camion.getById(id))

    if(!res.ok) {throw new Error("Erreur lorsque recupere ce camion ")}

    return res.json();
}

export const createCamion = async(data: Camion) => {

    const res = await apiFetch(API_ENDPOINTS.camion.create, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

        
    });

    if(!res.ok){throw new Error("erreur lorsque la creation d'une camion ")}

    return res.json();
}

export const updateCamion = async(id: string, data: Camion) => {

    const res  = await apiFetch(API_ENDPOINTS.camion.update(id), {
        method: 'PUT',
        headers: {
             'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(!res.ok) {throw new Error("erreur lorsque mis a jour d'un camion ")}

    return res.json()
}

export const deleteCamion = async(id: string) => {
    const res = await apiFetch(API_ENDPOINTS.camion.delete(id), {
        method: 'DELETE',
        
    });

    if(!res.ok) {throw new Error("erreur lorsque la suppression d'un camion")}
    
    return res.json()
}