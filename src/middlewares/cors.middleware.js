import cors from 'cors';


const corsOptions = {

    origin: [
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
};

export const corsMiddleware = cors(corsOptions);