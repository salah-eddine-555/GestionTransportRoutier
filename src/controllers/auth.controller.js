import User from '../models/User.js';
import {hashPassword, comparePassword} from '../utils/password.js';
import jwt from 'jsonwebtoken';
import {cookieOptions} from '../config/cookie.config.js';

export const register = async(req, res) => {

    try{
      
        const {firstname, lastname, email, password} = req.body;
        
         if(await User.findOne({email: email})){
            return res.status(409).json({
                success: false,
                message: 'ce email est deja utilise '
            });
        }
        
        const encyptPassword = await hashPassword(password);

        const user = await User.create({
            firstname, lastname, email, role : "chauffeur",
            password: encyptPassword
        });
        // const existeUser = await User.find({email: email});

        // const token  = jwt.sign({userId: user._id, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});

        res.status(201).json(
            {
                success: true,
                message: 'le compte chauffeur a cree avec success',
                user: user
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
                role: user.role,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});

            res.cookie('accessToken', token, cookieOptions);
        
             res.status(200).json(
                    {
                        success: true,
                        message: 'Login success',
                        user: user
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
