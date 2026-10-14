import express from 'express';
import router from './routes/routes.js';
import routerV2 from './routes/v2/v2.routes.js';

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is working!'
    });
});

app.use('/api/v1', router);

app.use('/api/v2', routerV2);


app.use(errorMiddleware)


export default app;