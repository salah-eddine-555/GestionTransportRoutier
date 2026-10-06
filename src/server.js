import express from 'express';
import router from './routes/routes.js';
import connectDB from './config/db.js';
import errorMiddleware from "./middlewares/error.middleware.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());



app.use("/api", router);

app.use(errorMiddleware);





app.get("/", (req, res) => {
    res.json({ message: 'gestion transpot' });
})



const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }catch(error){
        console.error("Failed to satrt server : ", error.message);
    }
}

start();

