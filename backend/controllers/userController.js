const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config()

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '100d'})
}

const signupUser = async (req, res) => {
    console.log("signing up")
    const {firstName, lastName, email, password} = req.body;

    try {
        const user = await User.signup(email, password, firstName, lastName  )
        //create token
        const token = createToken(user._id)

        // await User.findByIdAndUpdate(user._id, {token: [{token: token, signedAt: Date.now().toString()}]})
        // console.log('token', token)
        res.status(200).json({email, token,  isLandscaper: user.isLandscaper, _id: user._id, name: `${user.firstName} ${user.lastName}`})
    } catch(error) { 
        res.status(400).json({error: error.message})
    }
}

const signupLandscaper = async(req, res) => {
    let {firstName, lastName, email, password, buisnessName} = req.body;

    if(!buisnessName) {
        buisnessName = ''
    }

    try {
        const user = await User.signupLandscaper(email, password, firstName, lastName, buisnessName)
        //create token
        const token = createToken(user._id)

        // await User.findByIdAndUpdate(user._id, {token: [{token: token, signedAt: Date.now().toString()}]})
        // console.log('token', token)
        res.status(200).json({email, token,  isLandscaper: user.isLandscaper, _id: user._id, name: `${user.firstName} ${user.lastName}`})
    } catch(error) { 
        res.status(400).json({error: error.message})
    }
}
//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;


    try {
        const user = await User.login(email, password)

        //create token  
        const token = createToken(user._id)
    

        // let oldTokens = user.tokens || []

        // if(oldTokens.length){
        //     oldTokens = oldTokens.filter(t => {
        //         const timeDif = (Date.now() - parseInt(t.signedAt))/1000
        //         if(timeDif < process.env.TOKEN_EXPIRARY_DAYS * 86400){
        //             return t
        //         }
        //     })
        // }
        // console.log('token', token, 'oldtoken', oldTokens)
        // await User.findByIdAndUpdate(user._id, {token: [...oldTokens, {token: token, signedAt: Date.now().toString()}]})

        res.status(200).json({email, token,  isLandscaper: user.isLandscaper, address: user.address, _id: user._id, name: `${user.firstName} ${user.lastName}`})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const logOut = async() => {
    const {token} = req.body

    if(!token){
       return res.json({error: 'Logout failure'})
    }
    

    const tokens = req.user.tokens

    const newTokens = tokens.filter(t => t !== token)

    await User.findByIdAndUpdate(req.user._id, {tokens: newTokens})
    res.json({message: 'Log Out succesfull'})
}

const loginWithToken = async(req, res) => {
    console.log('user', req.user)
    if(!req.user) {
        return res.json({error: 'Failure to authroize'})
    }

    //Add address functionaility
    res.json({email: req.user.email, token: req.user.token,  isLandscaper: req.user.isLandscaper, address: 'home', _id: req.user._id, name: `${req.user.firstName} ${req.user.lastName}`})
}

const editAddress = async(req, res) => {
    const {id} = req.params
    const {address, fullAddress, addressGeocodeLat, addressGeocodeLng, addressGoogleMapsUrl} = req.body
    
    const update = await User.findByIdAndUpdate(id, {address, fullAddress, addressGeocodeLat, addressGeocodeLng, addressGoogleMapsUrl} )
    
    res.json({id, address, fullAddress, addressGeocodeLat, addressGeocodeLng, addressGoogleMapsUrl})
}

const getUserById = async(req, res) => {
    const {id} = req.params

    const user = await User.findById(id)
    console.log('USER', user)
    res.json({email: user.email, isLandscaper: user.isLandscaper, address: user.address, fullAddress: user.fullAddress, addressGeocodeLat: user.addressGeocodeLat, 
    addressGeocodeLng: user.addressGeocodeLng, _id: user._id, name: `${user.firstName} ${user.lastName}` })
}

module.exports = {
    signupUser,
    signupLandscaper,
    loginUser,
    logOut,
    loginWithToken,
    editAddress,
    getUserById
}
