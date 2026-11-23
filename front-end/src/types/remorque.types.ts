export type Remorque = {
    _id: string;
    immatriculation: string;
    type: string;
    kilometrage: number;
    etat: 'disponible' | 'maintenance';
    archive: boolean;
    createdAt: string;
    updatedAt: string;
}
export type CreateRemorque = {
    immatriculation: string;
    type: string;
    kilometrage?: number;
    etat?: 'disponible' | 'maintenance';
}

export type UpdateRemorque = {
     immatriculation?: string;
    type?: string;
    kilometrage?: number;
    etat?: 'disponible' | 'maintenance';
}

export type RemorqueResponse = {
    success: boolean;
    message: string;
    data : Remorque;
}

