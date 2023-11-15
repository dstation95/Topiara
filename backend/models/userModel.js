const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
// const stripe = require('stripe')(process.env.STRIPE_KEY)
const Schema = mongoose.Schema


const userSchema = new Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    isLandscaper : {
        type: Boolean,
        default: false,
        required: true
    },
    buisnessName : {
        type: String,
        required: false
    },
    address: {
        type: String,
    },
    fullAddress:{
        type: String
    },
    addressGeocodeLat: {
        type: Number,
    },
    addressGeocodeLng: {
        type: Number,
    },
    addressGoogleMapsUrl: {
        type: String,
    },
    tokens: [{type: Object}]
})

userSchema.statics.signup = async function(email, password, firstName, lastName) {
    console.log('lastname1', lastName)
    //validation
    if(!email || !password) {
        throw Error('All Feilds must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error("Please enter a valid email")
    }

    const exists = await this.findOne({email})

    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
//     const account = await stripe.accounts.create({
//   type: 'express',
//   capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
//   business_type: 'individual',
//     });
    const user = await this.create({email, password: hash, firstName, lastName})

    return user
}
userSchema.statics.signupLandscaper = async function(email, password, firstName, lastName, buisnessName) {
    console.log('buisnessName', buisnessName)
    //validation
    if(!email || !password) {
        throw Error('All Feilds must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error("Please enter a valid email")
    }

    const exists = await this.findOne({email})

    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
//     const account = await stripe.accounts.create({
//   type: 'express',
//   capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
//   business_type: 'individual',
//     });
    const user = await this.create({email, password: hash, firstName, lastName, buisnessName, isLandscaper: true})

    return user
}

//static login method 

userSchema.statics.login = async function(email,password ) {
    
    if(!email || !password) {
        throw Error('All Feilds must be filled')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('Incorrect Email')
    }
    
    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)