import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {

    try {
        let token = req.headers.authorization;
        if (token === undefined) {
            return res.status(401).json({
                error: 'Acces refuse Token manquant'
            })
        }
        token = token.split(' ')[1];
       

        if (!token) {
            return res.json("token not found");
        }

        const valideToekn = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = valideToekn;
        // console.log(req.user);
        next()

    } catch (err) {
        // console.log("test catch")
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

export const isAdmin = (req, res, next) => {
    // console.log("qsgdhqsgdjksqhgdksqh")
    try {
        const { role } = req.user;

        if (role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                sucess: false,
                message: 'not authorized userjgfgfjgfjfg'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        })
    }
}

export const isChauffeur = async(req, res, next) => {
    // console.log("isChauffeur"); 
    try {
        // console.log(req.user.role);
        const { role } = req.user
        console.log(role);
        if (role === 'chauffeur') {
            console.log('1');
            next();
        } else {
            console.log('3');
            return res.status(403).json({
                succes: false,
                message: 'not authorized user'
            })
        }
    } catch (err) {
        console.log("4");
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: err
        })
    }
}
