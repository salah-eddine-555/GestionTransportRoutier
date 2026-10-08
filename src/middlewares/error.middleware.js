

    const errorMiddleware  = (err, req, res, next) => {

        // console.log(err);

        if(err.type === 'entity.parse.failed'){
            return res.status(400).json({
                success: false,
                message: "le format JSON envoye  est invalide"
            })
        }
        if(err.name === 'ValidationError'){
            return res.status(400).json({
                succes: false,
                message: "Donnee invalid !"
            });
        }
    
        return res.status(err.statusCode || 500).json({
            succes: false,
            message: err.message || 'Une erreur au niveau de serveure'
        });
    }

    export default errorMiddleware;