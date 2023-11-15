const express = require('express')
const Post = require('../models/postModel')
const { createPost, getPosts, getPostsByCreatorId, deletePost, updatePost, getPostById } = require('../controllers/postController')
 
const router = express.Router()

router.get('/', getPosts)

router.get('/:id', getPostsByCreatorId)

router.get('/singlepost/:id', getPostById)


router.post('/', createPost)

router.delete('/:id', deletePost)

router.patch('/:id', updatePost)


module.exports = router