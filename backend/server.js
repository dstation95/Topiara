require('dotenv').config()

const express = require('express')
const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {console.log(error)})

