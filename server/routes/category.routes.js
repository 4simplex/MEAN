const express = require('express');
const router = express.Router();

const categoryCtrl = require('../controllers/category.controller');

router.get('/', categoryCtrl.getCategories);
router.post('/', categoryCtrl.createCategory);
router.get('/:id', categoryCtrl.getCategory);
router.put('/:id', categoryCtrl.editCategory);
router.delete('/:id', categoryCtrl.deleteCategory);

module.exports = router;