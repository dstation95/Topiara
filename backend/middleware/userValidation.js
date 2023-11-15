const {body, validationResult} = require('express-validator')

exports.validateUserSignup = [
    body('firstName').trim().isString().withMessage('Must be Valid Name').isLength({min: 2, max: 20}).
    withMessage('First name must be within 2 to 20 characters'),
    body('lastName').isString().withMessage('Must be Valid Name').isLength({min: 2, max: 20}).
    withMessage('Last name must be within 2 to 20 characters'),
    body('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
    body('password').trim().isLength({min: 8, max: 20})
    .withMessage('Password must be 8 to 20 characters'),
    body('confirmPassword').trim().custom((value, {req}) => {
        if(value != req.body.password) {
            throw new Error(' Both passwords must match')
        }
        return true;
    })
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if(!result.length) return next();

    const error = result[0].msg;
    console.log(result)
    res.json({message: error})
}