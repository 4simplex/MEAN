const Mp = require('../models/mp');
const mpCtrl = {};
var mercadopago = require('mercadopago');

mpCtrl.createPayment = (req, res) => {
    mercadopago.configurations.setAccessToken("TEST-4038437526022988-100215-a0ccbdb999d932aa1c452bb1eb548bea__LA_LB__-24703927");

    var payment_data = {
    transaction_amount: req.body.transaction_amount,
    token: req.body.token,
    description: req.body.description,
    installments: 1,
    payment_method_id: req.body.payment_method_id,
    payer: {
        email: 'ezequielmansilla2.0@gmail.com'
    }
    };
    // Save and posting the payment
    mercadopago.payment.save(payment_data).then(function (data) {
    // ...    
    // Print the payment status
    console.log(data.body.id);

     return res.json({algo})
    })
    .catch(function (error) {
        return res.json({status: error})
    });
}

module.exports = mpCtrl;
