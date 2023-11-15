const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuth = async(req, res, next) => {
    console.log('AUthoriztion works')
    const token = req.headers.authorization
    console.log(token)
    if(req.headers && req.headers.authorization) {
        try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
        const user = await User.findById(decode._id)
        if(!user) {
            res.json({msg: 'unauthorized access'})
        }
        console.log(user)
        req.user = user
        next()
    }
    catch(error) {
        if(error.name === 'JsonWebTokenError') {
            res.json({msg: 'Unauthorized Access'})
        }
        if(error.name === 'TokenExpiredError') {
            res.json({msg: 'Session Expired, Log in again!'})
        }
        console.log(error.name)
        res.json({msg: 'Access Error'})
    }
    }
    else {
        res.json({msg: 'unauthorized access'})
    }
}