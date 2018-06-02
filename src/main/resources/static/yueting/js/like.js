$(function() {
  var nas_num = $( "#nas_num" ),
    allFields = $( [] ).add( nas_num ),
    tips = $( ".validateTips" );

  function updateTips( t ) {
    tips
      .text( t )
      .addClass( "ui-state-highlight" );
    setTimeout(function() {
      tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
  }

  function checkVaild( o, n, min, max) {
    var n = parseFloat(o.val())
    console.log(typeof(o.val()) + " " +  n)
    if ( isNaN(n) || n < min || n  > max ) {
      o.addClass( "ui-state-error" );
      updateTips( " 必须满足 " + min + "  <= " + n + " <= " + max);
      return false;
    } else {
      return true;
    }
  }

  $( "#confirm-like" ).dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      " 确认 ": function() {
        var bValid = true;
        allFields.removeClass( "ui-state-error" );

        //从服务器检查钱包地址，如果不存在，直接添加
        bValid = bValid && checkVaild( nas_num , " NAS 数量", 0, 1);

        if ( bValid ) {
          alert(" NAS 数量为 :" + nas_num.val())
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

  $( "#like" )
    .button()
    .click(function() {
      $( "#confirm-like" ).dialog( "open" );
    });
});
