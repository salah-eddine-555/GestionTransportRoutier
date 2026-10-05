import User from '../models/User.js';
import {hashPassword, comparePassword} from '../utils/password.js';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {

    try{
      
        const {firstname, lastname, email, role, password} = req.body;
        const encyptPassword = await hashPassword(password);

        const user = await User.create({
            firstname, lastname, email, role,
            password: encyptPassword
        });

        const token  = jwt.sign({userId: user._id, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});

        res.status(201).json(
            {
                success: true,
                message: 'register success',
                token : token
            }
        )
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
      
    }
}

export const login = async(req, res) => {
    try{
            const {email, password} = req.body;

            const user = await User.findOne({email : email});
            if(!user){
                return res.status(404).json({success: false, message: 'user not found'});
            }
        
            const matchPassword = await comparePassword(password, user.password);
        
            if(!matchPassword){
                return res.status(401).json({
                    success: false,
                    message: 'password incorrect'
                }
                );
            }
            const payload = {
                userId: user._id,
                role: user.role
            }
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
        
             res.status(200).json(
                    {
                        success: true,
                        message: 'Login success',
                        token : token
                    }
                )
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const logout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logout success"
    });
};
