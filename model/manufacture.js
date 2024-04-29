const mongoose = require('mongoose');
//const validator = require('validator');

   const manufactureSchema = new mongoose.Schema({
            companyName: {
                type : String,
            },
            unit_id: {
                type: String,
                //ref:'User'
            },
            department: {
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

const Manufacture = mongoose.model('Manufacture', manufactureSchema);


module.exports = Manufacture;
