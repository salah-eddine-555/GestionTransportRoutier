
import { API_ENDPOINTS, apiFetch } from './api';

import type {
    CreateTrajetDTO,
    UpdateTrajetDTO,
    TrajetResponse,
    TrajetsResponse
} from '../types/trajet.types';


export const getAllTrajets = async (): Promise<TrajetsResponse> => {

    const res = await apiFetch(API_ENDPOINTS.trajet.getAll);

    if (!res.ok) {
        throw new Error('Erreur lors de la récupération des trajets');
    }

    return res.json();
};



export const getTrajetById = async (id: string): Promise<TrajetResponse> => {

    const res = await apiFetch(API_ENDPOINTS.trajet.getById(id));

    if (!res.ok) {
        throw new Error('Erreur lors de la récupération du trajet');
    }

    return res.json();
};



export const createTrajetRequest = async (data: CreateTrajetDTO): Promise<TrajetResponse> => {

    const res = await apiFetch(API_ENDPOINTS.trajet.create, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error('Erreur lors de la création du trajet');
    }

    return res.json();
};


// Modifier un trajet
export const updateTrajetRequest = async (id: string, data: UpdateTrajetDTO): Promise<TrajetResponse> => {

    const res = await apiFetch(API_ENDPOINTS.trajet.update(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error('Erreur lors de la modification du trajet');
    }

    return res.json();
};



export const deleteTrajet = async (id: string): Promise<{ success: boolean; message: string }> => {

    const res = await apiFetch(API_ENDPOINTS.trajet.delete(id), {
        method: 'DELETE'
    });

    if (!res.ok) {
        throw new Error('Erreur lors de la suppression du trajet');
    }

    return res.json();
};
