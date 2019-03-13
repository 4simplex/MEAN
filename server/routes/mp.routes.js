const express = require('express');
const router = express.Router();

const mp = require('../controllers/mp.controller');

router.post('/', mp.createPayment);

module.exports = router;