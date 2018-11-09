const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

router.post('/', CategoryController.Create);
router.get('/', CategoryController.Read);

module.exports = router;