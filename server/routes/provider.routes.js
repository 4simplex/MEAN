const express = require('express');
const router = express.Router();

const providerCtrl = require('../controllers/provider.controller');

router.get('/', providerCtrl.getProviders);
router.post('/', providerCtrl.createProvider);
router.get('/:id', providerCtrl.getProvider);
router.put('/:id', providerCtrl.editProvider);
router.delete('/:id', providerCtrl.deleteProvider);

module.exports = router;