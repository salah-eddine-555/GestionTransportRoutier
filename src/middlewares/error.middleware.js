

const errorMiddleware  = (err, req, res, next) => {

    console.log(err);
    if(err.name === 'ValidationError'){
        return res.status(400).json({
            success: false,
            message: "Donnee invalid !"
        });
    }

    return res.status(500).json({
        success: false,
        message: "Une Erreur au niveau de serveur"
    });
}

export default errorMiddleware;