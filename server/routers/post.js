const express = require('express');
const PostController = require('../controllers/post');

//agregamos autenticacion para modificar el sistema de post 
const md_auth = require('../middleware/authenticated');

const api = express.Router();

//endpoints
api.post('/add-post', [md_auth.ensureAuth] , PostController.addPost);
api.get('/get-posts', PostController.getPosts);
api.put('/update-post/:id',[md_auth.ensureAuth], PostController.updatePost);
api.delete('/delete-post/:id',[md_auth.ensureAuth], PostController.deletePost);
api.get('/get-post/:url', PostController.getPost);





module.exports = api ;