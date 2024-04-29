require("dotenv").config();
const UserRepo = require('../repository/userRepo');

exports.signUp = async (req, res) => {
    try {
  
        let createData = {
            full_name: req.body.full_name,
            email: req.body.email,
            phone: req.body.phone,
            type: req.body.type
        }
        console.log(createData,"createData");

        let create = await UserRepo.create(createData)
  
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during customer signup:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.findONeUser = async (req, res) => {
    try {
        // Assuming ProductRepo is your MongoDB collection
        let findOne = await UserRepo.findOne({});
        console.log(findOne,"00000000");
  
        return res.status(200).json({ message: 'Products found successfully', data: findOne });
    } catch (error) {
        console.error('Error during product search:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};