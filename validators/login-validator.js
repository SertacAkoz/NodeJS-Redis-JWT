const joi = require('joi')
const httpStatus = require('http-status');

async function loginValidation(req, res, next) {
    try {
        await joi.object({
          email: joi.string().email().required(),
          password: joi.string().required()
        }).validateAsync(req.body);
        next();
    } catch (error) {
        // res.status(417).send('Must have correct data entry.');

        const sendingJson = {
            yourData:error._original,
            error:String(error.details[0].message).replaceAll('\"','')
        }
        // eskisi 417
        res.status(httpStatus.EXPECTATION_FAILED).send(sendingJson);
    }
}

module.exports = {
    loginValidation
}