require("dotenv").config();
const mongoose = require('mongoose');
const CommentRepo = require('../repository/commentRepo');
 
exports.createPostComment = async (req, res) => {
    try {
        // Extract data from the request body
        const { postId, commenter, comment } = req.body;

        // Create data object according to the schema
        const createData = {
            postId: postId,
            commenter: commenter,
            comment: comment
        };

        // Create a new comment using the Comment model
        const createdComment = await CommentRepo.create(createData);

        // Respond with success message
        return res.status(200).json({ message: 'Comment created successfully', comment: createdComment });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.replyToComment = async (req, res) => {
    try {
        const commentId = req.body.commentId;
        const { commenter, replyText } = req.body;

        // Create the reply object
        const reply = {
            commenter: commenter,
            comment: replyText,
            // Add any other fields as needed
        };

        // Update the comment document to push the new reply object into the reply array
        await CommentRepo.updateById(commentId, { $push: { reply: reply } });

        return res.status(200).json({ message: 'Replied to comment successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.likeComment = async (req, res) => {
    try {
        const commentId = req.body.commentId;
        const userId = req.body.userId;

       
        await CommentRepo.updateById(commentId, { $push: { likes: userId } });

        return res.status(200).json({ message: 'Comment liked successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.likeSubComment = async (req, res) => {
    try {
        const commentId = req.body.commentId;
        const subCommentId = req.body.subCommentId; 
        const userId = req.body.userId;

        // Update the comment document to push the user's ObjectId into the likes array of the specified sub-comment
        await CommentRepo.update(
            { _id: commentId, "reply._id": subCommentId }, 
            { $push: { "reply.$.like": userId } }
        );

        return res.status(200).json({ message: 'Sub-comment liked successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
