require("dotenv").config();
const mongoose = require('mongoose');
const ManufactureRepo = require('../repository/manufactureRepo');
 
exports.createManufacture = async (req, res) => {
    try {
        let createData = {
            companyName: req.body.companyName,
            unit_id: req.body.unit_id,
            department: req.body.department,
        }
        console.log(createData,"createData");

        let create = await ManufactureRepo.create(createData)
  
      return res.status(200).json({ message: 'Manuacture created successfully' });
    } catch (error) {
      console.error('Error', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};


module.exports.findONe = async (req, res) => {
    try {
        // Assuming ProductRepo is your MongoDB collection
        let findOne = await ProductRepo.findOne({});
  
        return res.status(200).json({ message: 'Products found successfully', data: findOne });
    } catch (error) {
        console.error('Error during product search:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports.findManufactureWithProduct = async (req, res) => {
    try {
        // Assuming ProductRepo is your MongoDB collection
        let findOne = await ManufactureRepo.findAllManufacture({});
  
        return res.status(200).json({ message: 'Products found successfully', data: findOne });
    } catch (error) {
        console.error('Error during product search:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};