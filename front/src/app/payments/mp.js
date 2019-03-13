Mercadopago.setPublishableKey("TEST-afa7b1b1-3d09-4f03-8628-12144ad07d10");
console.log(Mercadopago)
function guessingPaymentMethod(event) {
console.log(event)
        var bin = event.target.value;

        if (event.type == "keyup") {
            if (bin.length >= 6) {
                Mercadopago.getPaymentMethod({
                    "bin": bin
                }, setPaymentMethodInfo);
            }
        } else {
            setTimeout(function() {
                if (bin.length >= 6) {
                    Mercadopago.getPaymentMethod({
                        "bin": bin
                    }, setPaymentMethodInfo);
                }
            }, 100);
        }
    };
var setPaymentMethodInfo = (status, response) => {
        if (status == 200) {
            document.querySelector("input[name=paymentMethodId]").value = response[0].id;
        }
    }

$(document).ready(function() {
    Mercadopago.getIdentificationTypes();

    
    
        $("#pay").submit(function( event ) {
            var $form = $(this);
            Mercadopago.createToken($form, mpResponseHandler);
            event.preventDefault();
            return false;
        });
        var mpResponseHandler = function(status, response) {
            var $form = $('#pay');
            if (response.error) {
                console.log(response);
            } else {
                var card_token_id = response.id;
                $form.append($('<input type="hidden" id="card_token_id" name="card_token_id"/>').val(card_token_id));
                console.log(response);

                //Mercadopago.configurations.setAccessToken(config.access_token);

                var payment_data = {
                    transaction_amount: 399,
                    token: response.id,
                    description: 'Okay Premium',
                    installments: 1,
                    payment_method_id: document.querySelector("input[name=paymentMethodId]").value,
                    payer: {
                    email: 'ezequielmansilla2.0@gmail.com'
                    }
                };

                console.log(payment_data);

                /*Mercadopago.payment.save(payment).then(function (data) {
                    // ...    
                    // Print the payment status
                    Console.log(payment.status);
                }).catch(function (error) {
                    // ...
                });*/

            }   
        }

        /*mercadopago.configurations.setAccessToken(config.access_token);

        var payment_data = {
            transaction_amount: 181,
            token: 'ff8080814c11e237014c1ff593b57b4d'
            description: 'Rustic Bronze Knife',
            installments: 1,
            payment_method_id: 'visa',
            payer: {
            email: 'carson@hotmail.com'
            }
        };

        // Save and posting the payment
        mercadopago.payment.save(payment).then(function (data) {
            // ...    
            // Print the payment status
            Console.log(payment.status);
        }).catch(function (error) {
            // ...
        });*/
})