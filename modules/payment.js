module.exports = (function(){
  'use strict';

  var PaymentConf = {
    api_key: "ak_test_J0NPYTr5cSyBoP4oe9yrtZWPZHJsU3",
    cryp_key: "ek_test_CgsbshipppRGhvEZO6atIuEZv3Ijy9",
    card_id: "card_cio4wv2e500ulx76diizcwfwm"
  };

  var Payment = function(){};

  Payment.pay = function() {
      console.log(PaymentConf);
      console.log('paid');
      return true;
  };

  return Payment;

})();
