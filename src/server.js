// import app from './app.js';
import connectDB from './config/db.js';
import {RedisConnect} from './config/redis.js';


import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB();
        await RedisConnect();

        //on va fait ici un dynamique import pour app lorsque on va premierment le connection avec redis apres le chargement de app 
        const { default: app } = await import("./app.js");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }catch(error){
        console.error("Failed to satrt server : ", error.message);
    }
}

start();

