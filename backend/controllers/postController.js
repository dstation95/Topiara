const Post = require('../models/postModel')
const mongoose = require('mongoose')


const getPosts = async(req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1})

    res.status(200).json(posts)
}

const getPostsByCreatorId = async(req, res) => {
    const {id} = req.params
    const posts = await Post.find({posterId: id})

    // console.log('posts', posts, 'id', id)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Posts unable to be found'})
    }

    if(!posts) {
        return res.status(404).json({error: 'Posts unable to be found'})
    }

    // console.log(posts)
    res.status(200).json(posts)
}

const getPostById = async(req, res) => {
    const {id} = req.params
    const post = await Post.findById(id)

    // console.log('POST', post,)
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Post unable to be found'})
    }

    if(!post) {
        return res.status(404).json({error: 'Post unable to be found'})
    }
    res.status(200).json(post)
    
}

const createPost = async(req, res) => {
    console.log('Works')
    const {title, description, price, posterId, address, fullAddress, addressGeocodeLat, addressGeocodeLng, addressGoogleMapsUrl} = req.body
    
    console.log(posterId)
    try {
        const post = await Post.create({title, description, price, posterId, address, fullAddress, addressGeocodeLat, addressGeocodeLng, addressGoogleMapsUrl })

        res.status(200).json(post)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

const deletePost = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Post unable to be found'})
    }

    const post = await Post.findByIdAndDelete({_id: id})

    if(!post) {
        return res.status(404).json({error: 'Post unable to be found'}) 
    }

    res.status(200).json(post)
}

const updatePost = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Post unable to be found'})
    }

    const post = await Post.findByIdAndUpdate({_id: id}, {...req.body})

    if(!post) {
        return res.status(404).json({error: 'Post unable to be found'}) 
    }

    res.status(200).json(post)
}

module.exports = {
    createPost,
    getPosts,
    getPostsByCreatorId,
    getPostById,
    deletePost,
    updatePost,
}