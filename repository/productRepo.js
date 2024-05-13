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
            pipeline: [
                { 
                    $project: {
                        companyName: "$companyName", 
                        department: "$department",
                    }
                }
              ],
            localField: 'mfd_id', 
            foreignField: '_id', 
            as: 'manufactures' 
          }
        },
        { $skip: data.offset },
        { $limit: data.limit },
        { $sort: { _id: 1 } },
        //totalAmount: { $sum: "$qty" },
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


// module.exports.findOneProductPopulateLikeInclude1 = (where) => {
//     return new Promise((resolve, reject) => {
//         Product.findOne(where)
//             .populate({
//                 path: 'mfd_id',
//                 select: '-_id', // Exclude _id field from populated document if needed
//                 model: 'Manufacture' // Model name for 'mfd_id'
//             })
//             .populate({
//                 path: 'user_id',
//                 select: '-_id', // Exclude _id field from populated document if needed
//                 model: 'User' // Model name for 'user_id'
//             })
//             .then(result => {
//                 result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
                
//                 // Aliasing the populated fields
//                 result.manufacturer = result.mfd_id;
//                 delete result.mfd_id;
//                 result.user = result.user_id;
//                 delete result.user_id;
                
//                 resolve(result);
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     });
// };


module.exports.findOneProductPopulateLikeInclude = () => {
    return new Promise((resolve, reject) => {
        Product.aggregate([
            {
                $lookup: {
                    from: mongoose.model('Manufacture').collection.name,
                    localField: 'mfd_id', 
                    foreignField: '_id', 
                    as: 'Manufacture_details',
                    pipeline: [                       
                        { 
                            $lookup: {
                                from: mongoose.model('User').collection.name,
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'User_details'
                            }
                        }
                    ],
                }
            },
        ])
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });
    });
};