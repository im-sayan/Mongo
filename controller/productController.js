require("dotenv").config();
const mongoose = require('mongoose');
const ProductRepo = require('../repository/productRepo');
 
exports.createProduct = async (req, res) => {
    try {
        const userId = mongoose.Schema.ObjectId(req.body.user_id);
        let createData = {
            name: req.body.name,
            user_id: userId,
            price: req.body.price,
        }
        console.log(createData,"createData");

        let create = await ProductRepo.create(createData)
  
      return res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
      console.error('Error during customer signup:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.findProducts = async (req, res) => {
    try {
        // Assuming ProductRepo is your MongoDB collection
        let findall = await ProductRepo.findAll({ user_id: { $in: ['662ca1c0683d5c520712ad35','662ca36e73e899584dbc0796'] } });
  
        return res.status(200).json({ message: 'Products found successfully', data: findall });
    } catch (error) {
        console.error('Error during product search:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};


exports.findONeProduct = async (req, res) => {
    try {
        // Assuming ProductRepo is your MongoDB collection
        let findOne = await ProductRepo.findOne({});
  
        return res.status(200).json({ message: 'Products found successfully', data: findOne });
    } catch (error) {
        console.error('Error during product search:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
