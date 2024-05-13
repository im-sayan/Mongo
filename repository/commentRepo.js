const Comment = require('../model/comment')
const mongoose = require('mongoose');

module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        let Data =  new Comment(data);
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
        Comment.findOne(where).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findAll = (where) => {
    return new Promise((resolve, reject) => {
        Comment.find(where).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


module.exports.updateById = (where, data) => {
    return new Promise((resolve, reject) => {
        Comment.findByIdAndUpdate(where, data)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports.update = (where, data) => {
    return new Promise((resolve, reject) => {
        Comment.updateOne(where, data)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};