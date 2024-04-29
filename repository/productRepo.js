

const Product = require('../model/product')


module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        let Data =  new Product(data);
        Data.save().then(result => {
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
        Product.findOne(where).populate('user_id').then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


//Find All
module.exports.findAll = (where) => {
    return new Promise((resolve, reject) => {
        Product.find(where)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};
