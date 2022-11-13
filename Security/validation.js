const Joi = require('joi');


const schema = Joi.object({
    name: Joi.string().min(6),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    repassword: Joi.ref("password"),
})
module.exports.userValidation = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        res.json(error);
    } else {
        next();
    }
}