const Mp = require('../models/mp');
const fetch = require('node-fetch');
const User = require('../models/user');
const mpCtrl = {};
var mercadopago = require('mercadopago');
const actualToken = "TEST-4038437526022988-031819-fbb8c0a1f1dbdbd5db6af3b3b8daa0bf-24703927";
mercadopago.configure({
    access_token: actualToken
});

/* PAGO SIMPLE
mpCtrl.createPayment = (req, res) => {
    mercadopago.configurations.setAccessToken("TEST-4038437526022988-031819-fbb8c0a1f1dbdbd5db6af3b3b8daa0bf-24703927");

    var payment_data = {
    transaction_amount: req.body.transaction_amount,
    token: req.body.token,
    description: req.body.description,
    installments: 1,
    payment_method_id: req.body.payment_method_id,
    payer: {
        email: req.body.payer.email
        }
    };
    // Save and posting the payment
    mercadopago.payment.save(payment_data).then(function (data) {
    // ...    
    // Print the payment status
     return res.json({status: data})
    })
    .catch(function (error) {
        return res.json({status: error})
    });
}*/

mpCtrl.registerUserAndCard = (req, res) => {

    customer_data = { "email": req.body.email, "token": req.body.token };
    console.log(customer_data);

    mercadopago.customers.create(customer_data).then(function (customer) {

    return res.json({status: customer})

    }).catch(function (error) {
        return res.json({status: error})
    });
};

mpCtrl.susbcribeToPlan = async (req, res) => {
    subscription_data = {
      "plan_id": "158171755cc7403794f3a24dbc3a8fc6",
      "payer": {
              "id": req.body.user
      }
  }

  const regreso = await fetch("https://api.mercadopago.com/v1/subscriptions/?access_token=" + actualToken, {
            method: 'POST',
            body: JSON.stringify(subscription_data),
        })
        .then(function(response) {
            return response
        }).catch(function (error) {
          return error
      });
  const data = await regreso.json();
  return res.json({status: data})
}

mpCtrl.getCustomerInfo = async (req, res) => {
  const regreso = await fetch("https://api.mercadopago.com/v1/customers/"+req.params.id+"?access_token=" + actualToken, {
            method: 'GET',
        })
        .then(function(response) {
            return response
        }).catch(function (error) {
          return error
      });
  const data = await regreso.json();
  return res.json({status: data})
}

mpCtrl.userUpdate = async (req, res) => {
    console.log(req.body)
    const getUser = req.body.current;
    console.log(getUser)
    const userRegistered = req.body.userRegistered;
    console.log(userRegistered)
    const userSubscription = req.body.userSubscription;
    console.log(userSubscription)
    const premium = req.body.premium;
    console.log(premium)

    const updated = await User.findByIdAndUpdate(getUser, { $set: { premium: premium, suscription: userSubscription, customer: userRegistered } });
    return res.json({status: "ok"})
}

mpCtrl.getUserCards = async(req, res) => {
    const cards = await fetch("https://api.mercadopago.com/v1/customers/"+req.params.id+"?access_token=" + actualToken, {
            method: 'GET',
        })
        .then(function(response) {
            return response
        }).catch(function (error) {
          return error
      });
  let datas = await cards.json();
  return res.json({status: datas})
}

mpCtrl.getUserSuscription = async(req, res) => {
    const subscription = await fetch("https://api.mercadopago.com/v1/subscriptions/"+req.params.id+"?access_token=" + actualToken, {
            method: 'GET',
        })
        .then(function(response) {
            return response
        }).catch(function (error) {
          return error
      });
  let subscriptionResult = await subscription.json();
  return res.json({status: subscriptionResult})
}

mpCtrl.cancelUserSuscription = async(req, res) => {
    console.log(req.body);
    const cancelSubscription = await fetch("https://api.mercadopago.com/v1/subscriptions/"+req.body.id+"?access_token=" + actualToken, {
            method: 'PUT',
            body: JSON.stringify({"status": req.body.status})
        })
        .then(function(response) {
            return response
        }).catch(function (error) {
          return error
      });
  let cancelSubscriptionResult = await cancelSubscription.json();
  const updateU = await mpCtrl.userUpdateSubs(req.body.current, req.body.status);
  return res.json({status: cancelSubscriptionResult})
}

mpCtrl.userUpdateSubs = async (currentUser, status) => {
    console.log(currentUser)
    let isSubscribed = status === "paused" ? false : true;
    return User.findByIdAndUpdate(currentUser, { $set: { premium: isSubscribed } });
}

mpCtrl.changeCard = async(req, res) => {
    console.log(req.body);
    const addCard = await fetch("https://api.mercadopago.com/v1/customers/"+req.body.customer+"/cards?access_token=" + actualToken, {
            method: 'POST',
            body: JSON.stringify({"token": req.body.token, "customer": req.body.customer})
        })
        .then(function(response) {
            return response
        }).catch(function (error) {
          return error
      });
  let addCardResult = await addCard.json();
  let setCards = mpCtrl.setCardAsDefault(addCardResult.id, req.body.customer);
  return res.json({status: "Se realizo el cambio de tarjeta. Va a ser redirigido a la pagina de perfil."})
}

mpCtrl.setCardAsDefault = async(card, customer) => {
    const setCard = await fetch("https://api.mercadopago.com/v1/customers/"+customer+"?access_token=" + actualToken, {
            method: 'PUT',
            body: JSON.stringify({"default_card": card})
        })
        .then(function(response) {
            return response
        }).catch(function (error) {
          return error
      });
  let setCardResult = await setCard.json();
}



module.exports = mpCtrl;
