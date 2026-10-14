import app from './app.js';
import connectDB from './config/db.js';


import dotenv from "dotenv";
dotenv.config();

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

