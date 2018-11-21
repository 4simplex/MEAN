const express = require('express');
const router = express.Router();

const stockCtrl = require('../controllers/Stock.controller');

router.get('/', stockCtrl.getStockLst);
router.post('/', stockCtrl.createStock);
router.get('/:id', stockCtrl.getStock);
router.put('/:id', stockCtrl.editStock);
router.delete('/:id', stockCtrl.deleteStock);

module.exports = router;