const express = require("express");
//const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

/* ############################################ Controllers ############################################ */
const UserController = require("../controller/userController");
const ProductController = require("../controller/productController");

router.post('/register-user',UserController.signUp);
router.post('/create-product',ProductController.createProduct);
router.get('/fetch-product',ProductController.findProducts);
router.get('/fetch-one-product',ProductController.findONeProduct);
router.get('/fetch-user-all-products',UserController.findONeUser);

module.exports = router;