Mercadopago.setPublishableKey("TEST-afa7b1b1-3d09-4f03-8628-12144ad07d10");
console.log(Mercadopago)
function guessingPaymentMethod(event) {
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

function sendPlan(payment_data) {
    fetch("http://localhost:3000/api/mp", {
         method: 'POST',
         body: JSON.stringify(payment_data),
         headers:{
             'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            console.log(response);
        })
}

$(document).ready(function() {
    Mercadopago.getIdentificationTypes();
    $.get("https://api.mercadopago.com/v1/payments/18196278?access_token=TEST-4038437526022988-100215-a0ccbdb999d932aa1c452bb1eb548bea__LA_LB__-24703927",function(data){
        console.log(data)
    })
    

    let buttonsRadio = $('input[name=plan]');
    buttonsRadio.change(function(){
        buttonsRadio.each(function(){
            if($(this).attr("checked") === "checked"){
                $(this).removeAttr("checked");
            }else{
                $(this).attr("checked", "checked");
            }
        });
    }); 
    
    
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
            const checkPlan = $("input[name='plan']:checked");

            if(checkPlan.val() === "premium"){
                let premium_data = {
                    transaction_amount: 990,
                    token: response.id,
                    description: 'Okay Premium',
                    installments: 1,
                    payment_method_id: document.querySelector("input[name=paymentMethodId]").value,
                    payer: {
                    email: document.querySelector("input[name=email]").value
                    }
                };
                sendPlan(premium_data);
            }else if(checkPlan.val() === "advanced"){
                let advanced_data = {
                    transaction_amount: 399,
                    token: response.id,
                    description: 'Okay Advanced',
                    installments: 1,
                    payment_method_id: document.querySelector("input[name=paymentMethodId]").value,
                    payer: {
                    email:  document.querySelector("input[name=email]").value
                    }
                };
                sendPlan(advanced_data);
            }else{
                alert("El plan no es valido");
                return;
            }

        }   
    }  
})