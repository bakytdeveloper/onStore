// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const AdminController = require('./../controllers/AdminController');

router.get('/products', AdminController.getAllProductsAdmin);
router.get('/orders', AdminController.getAllOrdersAdmin);
router.get('/users', AdminController.getAllUsersAdmin);
router.post('/edit-product', AdminController.editProduct);


router.post('/create-product', AdminController.createProduct);
router.post('/edit-product', AdminController.editProduct);
router.delete('/delete-product/:productId', AdminController.deleteProduct);



module.exports = router;
