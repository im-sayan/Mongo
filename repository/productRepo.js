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


module.exports.delete = (where, data) => {
    return new Promise((resolve, reject) => {
        Product.deleteMany(where, data)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports.count = (where, data) => {
    return new Promise((resolve, reject) => {
        Product.countDocuments(where, data)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports.findGroupProductSameManufacture = () => {
    return new Promise((resolve, reject) => {
        Product.aggregate([
            {
                $group: {
                    _id: "$mfd_id", // Group by the "mfd_id" field
                    products: { $push: "$$ROOT" } // Retain all details of the documents in the "products" array
                }
            }
        ]).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error); 
        });
    });
};
