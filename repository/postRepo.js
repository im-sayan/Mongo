const Post = require('../model/post')
const mongoose = require('mongoose');

module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        let Data =  new Post(data);
        Data.save().then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        Post.findOne(where).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findAll = (where) => {
    return new Promise((resolve, reject) => {
        Post.find(where).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findAllPostWithComment = (where) => {
    return new Promise((resolve, reject) => {
        Post.aggregate([
            {
                $lookup: {
                    from: mongoose.model('comments').collection.name,
                    localField: '_id', 
                    foreignField: 'postId', 
                    as: 'Comments' 
                }
            }
        ]).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}