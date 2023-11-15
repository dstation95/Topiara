const express = require('express')
const { check } = require('express-validator')
const { signupUser, loginUser, logOut, loginWithToken, signupLandscaper, editAddress, getUserById} = require('../controllers/userController')
const { isAuth } = require('../middleware/auth')
const { validateUserSignup, userValidation } = require('../middleware/userValidation')

const router = express.Router()

//login Route
router.post('/login', loginUser)

//signup Route
router.post('/signup',validateUserSignup ,userValidation, signupUser)
router.post('/signupLandscaper',validateUserSignup ,userValidation, signupLandscaper)

router.post('/logout', isAuth,  logOut )

router.get('/loginWithToken', isAuth, loginWithToken )

router.patch('/editAddress/:id', editAddress)

router.get('/:id', getUserById)
// router.patch('/', createUserStore)

// router.get('/getAll', getUsers)

// router.patch('/stripeConnected/:id', updateSeller)

// router.get('/singleUser/:email', getIdByEmail)

// router.get('/:id', getUserStore)


module.exports = router