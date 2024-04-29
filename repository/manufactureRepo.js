const Manufacture = require('../model/manufacture')
const mongoose = require('mongoose');

module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        let Data =  new Manufacture(data);
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
        Manufacture.findOne(where).populate('user_id').then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findAll = (where) => {
    return new Promise((resolve, reject) => {
        Manufacture.find(where).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.findAllManufacture = (where) => {
    return new Promise((resolve, reject) => {
        Manufacture.aggregate([
            {
                $lookup: {
                    from: mongoose.model('Product').collection.name,
                    localField: '_id', 
                    foreignField: 'mfd_id', 
                    as: 'products' 
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