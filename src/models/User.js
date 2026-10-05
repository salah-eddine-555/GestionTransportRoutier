import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    
    firstname : {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true
    },
    status : {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'chauffeur'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User  = mongoose.model("User", UserSchema);

export default User;