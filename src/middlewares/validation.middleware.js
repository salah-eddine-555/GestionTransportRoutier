
const  validate = (schema, source = 'body') => {
    return (req, res, next) => {

        const {error, value} = schema.validate(req[source], {
            abortEarly: false,
            stripUnknown: true
        });

        if(error){
            const errors = error.details.map((d) => ({
                field: d.path.join('.'),
                message: d.message
            }));
            return res.status(400).json({
                status: "errors",
                message: 'Validation failed ',
                errors
            })
        }
        req[source] = value;
        next();
    }
}
export default validate;