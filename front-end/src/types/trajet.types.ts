
export type StatutTrajet = 'à faire' | 'en cours' | 'terminé';

export type Trajet  = {
    _id: string;

    siteDepart: string;
    siteArrivee: string;
    marchandise: string;

    dateDepartPrevu: string;
    dateArriveePrevue: string;

    statut: StatutTrajet;

    kiloDepart?: number;
    kiloArrivee?: number;
    volumeGasoil?: number;

    remarque?: string;
    distanceParcourue?: number;
    consommationMoyenne?: number;

    chauffeur?: string;
    camion?: string;
    remorque?: string;

    createdAt: string;
    updatedAt: string;
}

export type  CreateTrajetDTO  = {
    siteDepart: string;
    siteArrivee: string;
    marchandise: string;

    dateDepartPrevu: string;
    dateArriveePrevue: string;

    chauffeur?: string;
    camion?: string;
    remorque?: string;

    kiloDepart?: number;
    remarque?: string;
}

export type UpdateTrajetDTO  = {
    siteDepart?: string;
    siteArrivee?: string;
    marchandise?: string;

    dateDepartPrevu?: string;
    dateArriveePrevue?: string;

    statut?: StatutTrajet;

    kiloDepart?: number;
    kiloArrivee?: number;
    volumeGasoil?: number;

    remarque?: string;
    distanceParcourue?: number;
    consommationMoyenne?: number;

    chauffeur?: string;
    camion?: string;
    remorque?: string;
}


export type TrajetResponse  = {
    success: boolean;
    message: string;
    data: Trajet;
}

export type TrajetsResponse  = {
    success: boolean;
    message: string;
    data: Trajet[];
}
