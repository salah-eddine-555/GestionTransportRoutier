export type CamionFormMode = 'create' | 'edit';

export type Camion = {
    _id: string;
    kilometrage?: number;
    etat?: 'disponible' | 'maintenance';
    archive?: boolean;
    createdAt: string;
    updatedAt: string;
};


export type CamionFormData = {
    kilometrage: number;
    etat: 'disponible' | 'maintenance';
    archive: boolean;
};
export type camionFormProps = {
    onClose: () => void;
    onSubmit: (data: CamionFormData) => void;
    initialData?: CamionFormData;
    mode: CamionFormMode;
}

export type CamionCardProps = {
    camion: Camion;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

