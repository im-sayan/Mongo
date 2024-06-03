require("dotenv").config();
const UserRepo = require('../repository/userRepo');
const commonFunction = require('../commonFunction');


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
  let commonfunction = await commonFunction.checkInternet();
        if(commonfunction == true){
            try {
              // Assuming ProductRepo is your MongoDB collection
              
              console.log(commonfunction,"commonfunction++++");
              let findOne = await UserRepo.findOneUserAllProduct({});
              console.log(findOne,"00000000");
        
              return res.status(200).json({ message: 'Products found successfully', data: findOne });
            } catch (error) {
                console.error('Error during product search:', error);
                return res.status(500).json({ message: 'Something went wrong' });
            }
        }else if(commonfunction == false){
          return res.status(400).json({ message: 'No internet connection' });
        }
    
};

exports.update = async (req, res) => {
    try {
  
        let createData = {
            full_name: req.body.full_name,
            email: req.body.email,
            phone: req.body.phone,
            type: req.body.type
        }
        console.log(createData,"createData");

        let update = await UserRepo.update({_id: req.body.id},createData)
  
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during customer signup:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
  
        let update = await UserRepo.delete({_id: req.body.id})
  
      return res.status(201).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error during customer signup:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};