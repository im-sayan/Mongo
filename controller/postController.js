require("dotenv").config();
const mongoose = require('mongoose');
const PostRepo = require('../repository/postRepo');
 
exports.createPost = async (req, res) => {
    try {
        let createData = {
            post: req.body.post,
            user_id: req.body.user_id, to: "objectId",
        }
        console.log(createData,"createData");

        let create = await PostRepo.create(createData)
  
      return res.status(200).json({ message: 'post created successfully' });
    } catch (error) {
      console.error('Error', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.postDetailsWithComments = async (req, res) => {
    try {
        // let createData = {
        //     post: req.body.post,
        //     user_id: req.body.user_id, to: "objectId",
        // }
        //console.log(createData,"createData");

        let fetchPostWithComment = await PostRepo.findAllPostWithComment({})
  
      return res.status(200).json({ message: 'post fetched successfully', data: fetchPostWithComment });
    } catch (error) {
      console.error('Error', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};