$(function() {
  var wallet = $( "#wallet" ),
    allFields = $( [] ).add( wallet ),
    tips = $( ".validateTips" );

  function updateTips( t ) {
    tips
      .text( t )
      .addClass( "ui-state-highlight" );
    setTimeout(function() {
      tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
  }

  function checkEqual( o, n, len ) {
    if ( o.val().length != len) {
      o.addClass( "ui-state-error" );
      updateTips( "" + n + " 的长度必须为" + len);
      return false;
    } else {
      return true;
    }
  }

  $( "#sign-up-dialog-form" ).dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      "登录": function() {
        var bValid = true;
        allFields.removeClass( "ui-state-error" );

        //从服务器检查钱包地址，如果不存在，直接添加
        bValid = bValid && checkEqual( wallet, "wallet", 35);

        if ( bValid ) {
          alert(" wallet address :" + wallet.val())
          $( this ).dialog( "close" );
        }
      },
      '取消': function() {
        $( this ).dialog( "close" );
      }
    },
    close: function() {
      allFields.val( "" ).removeClass( "ui-state-error" );
    }
  });

  $( "#sign-up" )
    .button()
    .click(function() {
      $( "#sign-up-dialog-form" ).dialog( "open" );
    });
});
