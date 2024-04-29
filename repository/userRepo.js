
const mongoose = require('mongoose');
const User = require('../model/user')
const Product = require('../model/product')

module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        let UserData =  new User(data);
        UserData.save().then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//Find One
module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: where }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


//Find All
module.exports.findAll = (where, data) => {
    return new Promise((resolve, reject) => {
        User.find({
            where: where,
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        User.aggregate([
            {
                $lookup: {
                    from: mongoose.model('Product').collection.name,
                    localField: '_id', 
                    foreignField: 'user_id', 
                    as: 'products' 
                }
            }
        ]).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error); 
        });
    });
};



