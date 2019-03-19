const Mp = require('../models/mp');
const mpCtrl = {};
var mercadopago = require('mercadopago');

mpCtrl.createPayment = (req, res) => {
    mercadopago.configurations.setAccessToken("TEST-4038437526022988-031819-fbb8c0a1f1dbdbd5db6af3b3b8daa0bf-24703927");

    var payment_data = {
    transaction_amount: req.body.transaction_amount,
    token: req.body.token,
    description: req.body.description,
    installments: 1,
    payment_method_id: req.body.payment_method_id,
    payer: {
        email: "ezequielmansilla2.0@gmail.com"
    }
    };
    // Save and posting the payment
    mercadopago.payment.save(payment_data).then(function (data) {
    // ...    
    // Print the payment status
    console.log(data.body.id);
    
     return res.json({status: data})
    })
    .catch(function (error) {
        return res.json({status: error})
    });
}

mpCtrl.registerUserAndCard = (data, token) => {
    /*customer_data = { "email": data.body.payer.email }

    mercadopago.customers.create(customer_data).then(function (customer) {

    card_data = {
        "token": token,
        "customer": customer.id
    }

    mercadopago.cards.create(card_data).then(function (card) {

        return res.json({status: card})
    }).catch(function (error) {
        return res.json({status: error})
    });

    }).catch(function (error) {
        return res.json({status: error})
    });*/
};

module.exports = mpCtrl;
