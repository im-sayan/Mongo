require("dotenv").config();
const mongoose = require('mongoose');
const ProductRepo = require('../repository/productRepo');
 
module.exports.createProduct = async (req, res) => {
    try {
        let createData = {
            name: req.body.name,
            user_id: req.body.user_id, to: "objectId",
            mfd_id: req.body.mfd_id, to: "objectId",
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

module.exports.findProducts = async (req, res) => {
    try {
        // Assuming ProductRepo is your MongoDB collection
        let Ids = req.body.id.map(i => i);
        console.log(Ids,"loggggggggggg+6666666666");

        let findall = await ProductRepo.findAll({ user_id: { $in: Ids} });
  
        return res.status(200).json({ message: 'Products found successfully', data: findall });
    } catch (error) {
        console.error('Error during product search:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports.findAllProducts = async (req, res) => {
  try {
    let data = {};
    let page = req.query.page ? parseInt(req.query.page) : 1; 
    data.limit = 12;
    data.offset = (page - 1) * data.limit;

    // Find all products with pagination
    const findall = await ProductRepo.findAllwithAggregationWithPagination({},data);

      return res.status(200).json({ message: 'Products fetch successfully', data: findall });
  } catch (error) {
      console.error('Error during product search:', error);
      return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.findONeProduct = async (req, res) => {
    try {
        // Assuming ProductRepo is your MongoDB collection
        let findOne = await ProductRepo.findOne({});
  
        return res.status(200).json({ message: 'Products found successfully', data: findOne });
    } catch (error) {
        console.error('Error during product search:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};


module.exports.deleteProduct = async (req, res) => {
    try {
  
        let update = await ProductRepo.delete({user_id: req.body.id})
  
      return res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error during customer signup:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports.countProduct = async (req, res) => {
    try {
  
        let count = await ProductRepo.count({})
  
      return res.status(201).json({ message: 'Product deleted successfully',data: count });
    } catch (error) {
      console.error('Error during customer signup:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports.groupProductinSameManufacture = async (req, res) => {
    try {
  
        let group = await ProductRepo.findGroupProductSameManufacture({})
  
      return res.status(201).json({ message: 'Product deleted successfully',data: group });
    } catch (error) {
      console.error('Error during customer signup:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};