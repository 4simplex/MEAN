const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/brand.controller');

router.post('/', BrandController.Create);
router.get('/', BrandController.Read);
router.put('/:id', BrandController.Update);
router.delete('/:id', BrandController.Delete);

module.exports = router;