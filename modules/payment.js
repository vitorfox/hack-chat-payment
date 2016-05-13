module.exports = (function(){
  'use strict';

  var PaymentConf = {
    api_key: "ak_test_EA06bt85B8ZeikBx7DkJVtytbaPs0M",
    cryp_key: "ek_test_SbnmKp5ewiX5wmU6LoLwcwbDd9gI9Y",
    card_id: "card_cio4g99ob00tnx86dzlu9gr07"
  };

  var Payment = function(){};

  Payment.pay = function() {
      console.log(PaymentConf);
      console.log('paid');
      return true;
  };

  return Payment;

})();
