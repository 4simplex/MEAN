Mercadopago.setPublishableKey("TEST-ba92d932-3b5c-46c4-9b32-097c5edfe7da");
/*
$.get("https://api.mercadopago.com/v1/payments/18196278?access_token=TEST-4038437526022988-100215-a0ccbdb999d932aa1c452bb1eb548bea__LA_LB__-24703927",function(data){
    console.log(data)
})
*/
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
/* PAGO SIMPLE
function sendPlan(payment_data) {
    fetch("http://localhost:3000/api/mp", {
            method: 'POST',
            body: JSON.stringify(payment_data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response){
            planMessages (response);
            return response;
        })
        .then(function(response){
            var bb = document.querySelector("input[name=email]").value;
            registerUser(bb, payment_data.token)
        })
}*/

function addNewCard(token) {
    let currentUserLocal = JSON.parse(window.localStorage.getItem('user'));
    fetch("http://localhost:3000/api/mp/changecard/", {
            method: 'POST',
            body: JSON.stringify({token: token, customer: currentUserLocal.customer}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            alert(response.status);
            window.location.href = '/profile';
        })
}

function registerUser(userData) {
    const userEmail = document.querySelector("input[name=email]").value;
    fetch("http://localhost:3000/api/mp/register/", {
            method: 'POST',
            body: JSON.stringify({email: userEmail, token: userData.token}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            subscribeUser(response)
        })
}

function subscribeUser(response) {
    fetch("http://localhost:3000/api/mp/subscribe/", {
            method: 'POST',
            body: JSON.stringify({user: response.status.body.id }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            if(response.status.status === "authorized"){
                updateUser(response);
                alert("Bienvenido a premium! registrado con exito.");
            }
        })
}

function updateUser(userResponse){
    let currentUserLog = JSON.parse(window.localStorage.getItem('user'));
    let userRegistered = userResponse.status.payer.id;
    let userSubscription = userResponse.status.id;
    let premium = true;
    let userData = {
        "current": currentUserLog.id,
        "userRegistered": userRegistered,
        "userSubscription": userSubscription,
        "premium": premium
    }

    console.log(userData);

    fetch("http://localhost:3000/api/mp/user/", {
        method: "POST",
        body: JSON.stringify(userData),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json()
    }).then((response) => {
        console.log(response)
    })
}

var createPlan = () => {
    fetch("http://localhost:3000/api/mp/registerc/", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response){
            console.log(response);
        })
}

function planMessages (data) {
    if(data.status.status === 201){
        if(data.status.response.status === "approved" && data.status.response.status_detail === "accredited"){
            alert("Listo, se acreditó tu pago! En tu resumen verás el cargo de amount como statement_descriptor.")
        }

        if(data.status.response.status === "in_process" && data.status.response.status_detail === "pending_contingency"){
            alert("Estamos procesando el pago. En menos de 2 días hábiles te enviaremos por e-mail el resultado.")
        }

        if(data.status.response.status === "in_process" && data.status.response.status_detail === "pending_review_manual"){
            alert("Estamos procesando el pago. En menos de 2 días hábiles te diremos por e-mail si se acreditó o si necesitamos más información.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_bad_filled_card_number"){
            alert("Revisa el número de tarjeta.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_bad_filled_date"){
            alert("Revisa la fecha de vencimiento.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_bad_filled_other"){
            alert("Revisa los datos.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_bad_filled_security_code"){
            alert("Revisa el código de seguridad.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_blacklist"){
            alert("No pudimos procesar tu pago.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_call_for_authorize"){
            alert("Debes autorizar ante " + data.status.response.payment_method_id + " el pago de amount a Mercado Pago.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_card_disabled"){
            alert("Llama a " + data.status.response.payment_method_id + " para que active tu tarjeta. El teléfono está al dorso de tu tarjeta.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_card_error"){
            alert("No pudimos procesar tu pago.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_duplicated_payment"){
            alert("Ya hiciste un pago por ese valor. Si necesitas volver a pagar usa otra tarjeta u otro medio de pago.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_high_risk"){
            alert("Tu pago fue rechazado. Elige otro de los medios de pago, te recomendamos con medios en efectivo.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_insufficient_amount"){
            alert("Tu " + data.status.response.payment_method_id + " no tiene fondos suficientes.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_invalid_installments"){
            alert(data.status.response.payment_method_id + "  no procesa pagos en " + data.status.response.installments + " installments cuotas.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_max_attempts"){
            alert("Llegaste al límite de intentos permitidos. Elige otra tarjeta u otro medio de pago.")
        }

        if(data.status.response.status === "rejected" && data.status.response.status_detail === "cc_rejected_other_reason"){
            alert(data.status.response.payment_method_id + "  no procesó el pago.")
        }

    } else {
        alert("Ocurrio un problema")
    }
}



$(document).ready(function() {
    Mercadopago.getIdentificationTypes();
    

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
    
    $("#createPlan").bind("click", createPlan);
    
    $("#pay").submit(function( event ) {
        var $form = $(this);
        if(mpFormValNull($form)){
            Mercadopago.createToken($form, mpResponseHandler);
        }
        event.preventDefault();
        return false;
    });

    $("input, select").not(':input[type=submit], :input[type=hidden]').click(function(){
        $(this).siblings("p").addClass("d-none");
    })

    var mpFormValNull = (form) => {
        var isNotEmpty = true;
       form.find("input, select").not(':input[type=submit], :input[type=hidden]').each(function(index, item){
           if($(item).attr('id') === "docType"){
                if($(item).find('option:selected').text() === ''){
                    $(item).siblings(".emptyErr").removeClass("d-none");
                    isNotEmpty = false;
                    return;
                }
           }else{
            if($(item).val() === ''){
                $(item).siblings(".emptyErr").removeClass("d-none");
                isNotEmpty = false;
            }
        }
       })

       return isNotEmpty;
    } 

    var mpResponseHandler = function(status, response) {
        var $form = $('#pay');
        if (response.error) {

            $.each(response.cause, function(index, item){
                switch(item.code) {
                    case "205": 
                        $("#cardNull").removeClass('d-none')
                        break;
                    case "208": 
                        $("#writeMonth").removeClass('d-none')
                    break;
                    case "209": 
                        $("#writeYear").removeClass('d-none')
                    break;
                    case "212": 
                        $("#writeDocType").removeClass('d-none')
                    break;
                    case "213": 
                        $("#writeSubType").removeClass('d-none') //no se que es
                    break;
                    case "214": 
                        $("#writeDocNumber").removeClass('d-none')
                    break;
                    case "220": 
                        $("#writeBank").removeClass('d-none') //banco emisor
                    break;
                    case "221": 
                        $("#writeName").removeClass('d-none')
                    break;
                    case "224": 
                        $("#writeDocCode").removeClass('d-none')
                        break;
                    case "316": 
                        $("#validName").removeClass('d-none')
                        break;
                    case "322": 
                        $("#validDocType").removeClass('d-none')
                        break;
                    case "323": 
                        $("#validSubType").removeClass('d-none') //no se que es
                        break;
                    case "325": 
                        $("#monthNotValid").removeClass('d-none')
                        break;
                    case "326": 
                        $("#yearNotValid").removeClass('d-none')
                        break;
                    case "E301": 
                        $("#cardNotValid").removeClass('d-none')
                        break;
                    case "E302": 
                        $("#codeNotValid").removeClass('d-none')
                        break;
                    case "324": 
                        $("#docNotValid").removeClass('d-none')
                        break;
                    case "106": 
                        alert("No puedes realizar pagos a usuarios de otros países.") //generacion de token desde aqui
                        break;
                    case "109": 
                        alert("payment_method_id no procesa pagos en installments cuotas. Elige otra tarjeta u otro medio de pago.") //ver variables
                        break;
                    case "126": 
                        alert("No pudimos procesar tu pago.")
                        break;
                    case "129": 
                        alert("payment_method_id no procesa pagos del monto seleccionado. Elige otra tarjeta u otro medio de pago.")
                        break;
                    case "145": 
                        alert("No pudimos procesar tu pago.")
                        break;
                    case "150": 
                        alert("No puedes realizar pagos.")
                        break;
                    case "151": 
                        alert("No puedes realizar pagos.")
                        break;
                    case "160": 
                        alert("No pudimos pocesar tu pago.")
                        break;
                    case "204": 
                        alert("payment_method_id no está disponible en este momento. Elige otra tarjeta u otro medio de pago.")
                        break;
                    case "801": 
                        alert("Realizaste un pago similar hace instantes. Intenta nuevamente en unos minutos.")
                        break;
                    default: 'Hubo un problema, ponte en contacto con OkayFunds!'
                }
            })
            
        } else {
            var card_token_id = response.id;
            $form.append($('<input type="hidden" id="card_token_id" name="card_token_id"/>').val(card_token_id));

            let isChangeCard = $('input[type="submit"]').attr("id");
            const checkPlan = $("input[name='plan']:checked");

            if(isChangeCard === "card"){
                addNewCard(card_token_id);
                console.log("tarjeta")
            }else if(isChangeCard === "subs"){
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
                
                registerUser(premium_data);
            }else{
                alert("Ocurrio un problema")
            }
        }   
    }  
})