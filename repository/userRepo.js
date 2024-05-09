
const mongoose = require('mongoose');
const User = require('../model/user')
const Product = require('../model/product')
const Manufacture = require('../model/manufacture')

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

module.exports.findOneUserAllProduct = (where) => {
    return new Promise((resolve, reject) => {
        User.aggregate([
            {
                $lookup: {
                    from: mongoose.model('Product').collection.name,
                    localField: '_id', 
                    foreignField: 'user_id', 
                    as: 'products' 
                }
            },
            // {
            //     $group: {
            //         _id: "$_id", // Group by the "mfd_id" field
            //         products: { $push: "$$ROOT" } // Retain all details of the documents in the "products" array
            //     }
            // }
        ]).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error); 
        });
    });
};

module.exports.update = (where, data) => {
    return new Promise((resolve, reject) => {
        User.updateOne(where, data)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};


module.exports.delete = (where, data) => {
    return new Promise((resolve, reject) => {
        User.deleteOne(where, data)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};