const Product = require('../model/product')
const mongoose = require('mongoose');

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

module.exports.findAllwithPagination = (where, data) => {
    return new Promise((resolve, reject) => {
      
      Product.find(where).skip(data.offset).limit(data.limit)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  module.exports.findAllwithAggregationWithPagination = (where, data) => {
    return new Promise((resolve, reject) => {
      Product.aggregate([
        { $match: where },
        { 
          $lookup: {
            from: mongoose.model('Manufacture').collection.name,
            localField: 'mfd_id', 
            foreignField: '_id', 
            as: 'manufactures' 
          }
        },
        { $skip: data.offset },
        { $limit: data.limit },
        { $sort: { _id: 1 } }
      ])
      .then(result => {
        console.log('Aggregation Result:', result); // Debugging
        resolve(result);
      })
      .catch(error => {
        console.error('Error in aggregation:', error); // Error handling
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
                    _id: "$mfd_id", 
                    products: { $push: "$$ROOT" }
                }
            }
        ]).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error); 
        });
    });
};
