var socket = null;
  $('.button-start').on("click", function(e){
        e.preventDefault();

        socket = io();

        var session_id = null;
        socket.on('session info', function(data) {
            session_id = data.id;
        });

        if ($(this).val() == "seller") {
            $("#charge-button").show();
            $('#charge-chat').removeClass('hide');
        }

        $('.chat-name-user').text($(this).val());
        $('.button-start').hide();
        $('.header').addClass("hide");
        $('.chat-box').removeClass('hide');

        socket.emit('set nickname', { "nickname": $(this).val() });

        socket.on('chat message', function(data){
            var msg = data.message;
            var li_class = "receiver";
            if (data.session_id == session_id) {
                li_class = "sender";
            }
            var messageBubble = '<li class="message-item"><div class="message-bubble-wrapper '+li_class+'"><div class="message-bubble-text">' + msg + '</div></div></li>';
            $('#messageList').append(messageBubble);
        });

        socket.on('charge sent message', function(msg){
            updateChargeDiv("<div class='loader'>Loading...</div>");
            setTimeout(function(){
            var content = 'Cobrança enviada no valor de R$'+ msg.amount +',00';
                updateChargeDiv(content);
            },3000);
        });

        function updateChargeDiv(content){
            var text = '<div class="payment-bar">' +
                '<div class="payment-header cf">'+
                '    <h2 class="title">'+content+'</h2>'+
                '    <button class="payment-bullets">Bullets</button>'+
                '</div>'+
                '</div>';

            $('#charge').html(text);
        }

        socket.on('charge message', function(msg){
        var text = '<div class="payment-bar">' +
            '<div class="payment-header cf">'+
            '    <h2 class="title">Você recebeu uma cobrança</h2>'+
            '    <button class="payment-bullets">Bullets</button>'+
            '</div>'+
            '<div class="payment-content">'+
            '    <div class="payment-wrapper cf">'+
            '    <h3 class="payment-title">Valor: <span class="payment-price">R$ '+msg.amount+',00</span></h3>'+
            '    <button class="payment-button" id="pay">Pagar</button>'+
            '    </div>'+
            '    <p class="payment-rules">Ao finalizar seu pagamento, você concorda com os Termos de Uso do site.</p>'+
            '</div>'+
            '</div>';

            $('#charge').html(text);
        });

        socket.on('payment finished', function(msg){
            console.log($('.payment-bar .payment-header .title'));
            $('.payment-bar .payment-header .title').text(msg);
        });
  });

  $('#message').on("submit", function(e){
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
  });

  $('#charge-chat').on("click",function(e){
        e.preventDefault();

        if($('.charge-box').hasClass('hide')) {
          $('.charge-box').removeClass('hide');
        } else {
          $('.charge-box').addClass('hide');
        }
        
  });

  

  $('#charge-button').on("click",function(e){
        e.preventDefault();
        var value = $("#value").val();
        socket.emit('send charge', { "amount": value });
        $('.charge-box').addClass('hide');
  });

  $("body").on("click", "#pay", function(e){
           e.preventDefault();
           socket.emit('send payment', "Pagamento efetuado com sucesso!");
     $('.payment-bar .payment-header .title').html("<div class='loader'>Loading...</div>");
           $('.payment-bar .payment-content').addClass("hide");
  });
