const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/:id/:name?', productController.getProductById);
router.get('/', productController.getProduct);
router.post('/', productController.createProduct);
router.delete('/', productController.deleteProduct);
router.put('/:id', productController.updateProduct)

module.exports = router;