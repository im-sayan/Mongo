const mongoose = require('mongoose');
//const validator = require('validator');

   const postSchema = new mongoose.Schema({
            post: {
                type : String,
            },
            user_id: {
                type: mongoose.Schema.ObjectId,
                ref:'User'
            },
            createAt: 
            {
                type: Date,
                default: Date.now()
            },
            updatedAt:
            {
                type: Date,
                default: Date.now()
            },
        });

const Post = mongoose.model('Post', postSchema);


module.exports = Post;
