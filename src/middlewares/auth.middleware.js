import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {

    try{
        let token = req.headers.authorization;
        if(token === undefined){
            return res.status(401).json({
                error: 'Acces refuse Token manquant'
            })
        }  
        token = token.split(' ')[1];

        if(!token){
            return res.json("token not found");
        }

        const valideToekn = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = valideToekn;
        next()

    }catch(err){
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

export const isAdmin = (req, res, next) => {
    try{
        const {role} = req.user;
        
        if(role === 'admin'){
            next();
        }else{
            return res.status(403).json({
                sucess: false,
                message: 'not authorized user'
            });
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err
        })
    }
}
