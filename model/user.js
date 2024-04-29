const mongoose = require('mongoose');
//const validator = require('validator');

   const userSchema = new mongoose.Schema({
            full_name: {
                type : String,
            },
            email: {
                type : String,
            },
            phone: {
                type: String,
            },
            type: {
                type: String,
            },
            // profile_image: {
            //     type:String,
            // },
            // address: {
            //     type: String,
            // },
            // country: {
            //     type: String,
            // },
            // country_code: {
            //     type: String,
            // },
            // country_code_abv: {
            //     type: String ,
            // },
            // telephone_code : {
            //     type: String,
            // },
            // introduction: {
            //     type: String,
            // },
            // description:{
            // type: Text,
            // },
            // experience:{
            //     type: String,
            //     enum:['<5','5-10','10-15','15-20','>20'],
            // },
            // qualification:{
            //     type: String,
            //     enum:['graduate','master','other'],
            // },
            // gov_issued_photo_id:{
            //     type: String,
            // },
            // avg_rating:{
            //     type: Double,
            // },
            // price_per_hour:{
            //     type: Number,
            // },
            // followers:{
            //     type: Number,
            // },
            // state:{
            //     type: String,
            // },
            // birth_year:{
            //     type: Number,
            // },
            // coin:{
            //     type: Number,
            // },
            // gender:{
            //     type: String,
            //     enum :['male','female','other'],
            //     default:null
            // },
            // logged_in_as:{
            //     type: String,
            //     enum :['student','teacher','institute'],
            //     default:null
            // },
            // login_type:{
            //     type: String,
            //     enum :['facebook','google','apple'],
            //     default:null
            // },
            // social_login_id:{
            //     type: String,
            // },
            // is_verified:{
            //     type: Number,
            //     enum :[0,1,2],
            //     default: 0
            // },
            // is_online:{
            //     type: String,
            //     enum :['online','offline'],
            //     default:null
            // },
            // is_active:{
            //     type: Number,
            //     enum :[0,1],
            //     default: 1
            // },
            // is_deleted:{
            //     type: Number,
            //     enum :[0,1],
            //     default: 0
            // },
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

const User = mongoose.model('User', userSchema);


module.exports = User;
