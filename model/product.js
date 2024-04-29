const mongoose = require('mongoose');
//const validator = require('validator');

   const productSchema = new mongoose.Schema({
            name: {
                type : String,
            },
            user_id: {
                type: mongoose.Schema.ObjectId,
                ref:'User'
            },
            price: {
                type: String,
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

const Product = mongoose.model('Product', productSchema);


module.exports = Product;
