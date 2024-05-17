const express = require("express");
//const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

/* ############################################ Controllers ############################################ */
const UserController = require("../controller/userController");
const ProductController = require("../controller/productController");
const ManufactureController = require("../controller/manufactureController");
const PostControllers = require("../controller/postController");
const CommentControllers = require("../controller/commentController");

router.post('/register-user',UserController.signUp);
router.post('/create-product',ProductController.createProduct);
router.get('/fetch-product',ProductController.findProducts);
router.get('/fetch-one-product',ProductController.findONeProduct);
router.get('/fetch-user-all-products',UserController.findONeUser);
router.post('/update-user',UserController.update);
router.post('/delete-user',UserController.deleteUser);
router.post('/delete-products',ProductController.deleteProduct);
router.get('/count-products',ProductController.countProduct);
router.get('/group-products',ProductController.groupProductinSameManufacture);
router.post('/create-manufacture',ManufactureController.createManufacture);
router.get('/manufacture-with-product',ManufactureController.findManufactureWithProduct);
router.get('/fetch-all-products',ProductController.findAllProducts);
router.get('/fetch-populate-product',ProductController.findONeProductpopulate);

router.post('/post-create',PostControllers.createPost);
router.post('/post-comment-create',CommentControllers.createPostComment);
router.post('/reply-comment',CommentControllers.replyToComment);
router.post('/reply-like',CommentControllers.likeComment);
router.post('/reply-like-subcomment',CommentControllers.likeSubComment);
router.get('/fetch-post-with-comment',PostControllers.postDetailsWithComments);
//router.post('/target-request',UserController.targetRequest);

module.exports = router;