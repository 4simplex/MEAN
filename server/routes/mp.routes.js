const express = require('express');
const router = express.Router();

const mp = require('../controllers/mp.controller');

//router.post('/', mp.createPayment);
router.post('/register/', mp.registerUserAndCard);
router.post('/subscribe/', mp.susbcribeToPlan);
router.get('/customer/:id', mp.getCustomerInfo);
router.post('/user/', mp.userUpdate);
router.get('/usercards/:id', mp.getUserCards);
router.get('/usersuscription/:id', mp.getUserSuscription);
router.put('/usercancelsuscription/', mp.cancelUserSuscription);
router.post('/changecard/', mp.changeCard);
//router.post('/registerc/', mp.createPlan);

module.exports = router;