const API_BASE_URL = import.meta.env.VITE_API_URL;


export const API_ENDPOINTS = {
    auth: {
        register: `${API_BASE_URL}/api/v1/register`,
        login: `${API_BASE_URL}/api/v1/login`,
        logout: `${API_BASE_URL}/api/v1/logout`
    },
    camion: {
        getAll: `${API_BASE_URL}/api/v1/camions`,
        getById: (id: string) => `${API_BASE_URL}/api/v1/camions/${id}`,
        create: `${API_BASE_URL}/api/v1/camions`,
        update: (id: string) => `${API_BASE_URL}/api/v1/camions/${id}`,
        delete: (id: string) => `${API_BASE_URL}/api/v1/camions/${id}`

    },
    remorque: {
        getAll: `${API_BASE_URL}/api/v1/remorques`,
        getById: (id: string) => `${API_BASE_URL}/api/v1/remorques/${id}`,
        create: `${API_BASE_URL}/api/v1/remorques`,
        update: (id: string) => `${API_BASE_URL}/api/v1/remorques/${id}`,
        delete: (id: string) => `${API_BASE_URL}/api/v1/remorques/${id}`
    },
    trajet : {
        getAll: `${API_BASE_URL}/api/v1/trajets`,
        getById: (id: string) => `${API_BASE_URL}/api/v1/trajets/${id}`,
        create: `${API_BASE_URL}/api/v1/remorques`,
        update: (id: string) => `${API_BASE_URL}/api/v1/trajets/${id}`,
        delete: (id: string) => `${API_BASE_URL}/api/v1/trajets/${id}`
    }
}

export const apiFetch = async(url: string, options: RequestInit = {}): Promise<Response> => {

    const headers = new Headers(options.headers);
    
    
    return fetch(url, {
        ...options,
        headers,
        credentials: 'include'
    })
}

