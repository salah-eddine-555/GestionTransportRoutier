import mongoose from 'mongoose';


const ConnectDB = async() => {

    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log('connection with database succfully');

    }catch(err){
        console.log("connection field : ",  err.message);
        process.exit(1);
    }
}

export default ConnectDB;