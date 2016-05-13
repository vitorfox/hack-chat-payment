var request = require('request');

module.exports = (function(){
  'use strict';

  var PaymentConf = {
    api_key: "ak_test_EA06bt85B8ZeikBx7DkJVtytbaPs0M",
    cryp_key: "ek_test_SbnmKp5ewiX5wmU6LoLwcwbDd9gI9Y",
    card_id: "card_cio4g99ob00tnx86dzlu9gr07"
  };

  var Payment = function(){};

  Payment.pay = function() {

    return new Promise(function(resolve, reject){

      //Lets configure and request
      request({
        url: 'https://api.pagar.me/1/transactions', //URL to hit
        method: 'POST',
        form: {
          api_key: PaymentConf.api_key,
          amount: 1000,
          card_id: PaymentConf.card_id
        }
      }, function(error, response, body){
        if(error) {
          console.log(error);
          reject();
        } else {
          console.log(response.statusCode, body);
          var result = JSON.parse(body);
          if(result.status == "paid") {
            resolve();
          } else {
            reject();
          }
        }
      });
    });
  };

  return Payment;

})();
