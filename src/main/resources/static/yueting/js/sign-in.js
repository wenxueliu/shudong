$(function() {
  var name = $( "#name" ),
    //email = $( "#email" ),
    //password = $( "#password" ),
    wallet = $( "#wallet" ),
    //allFields = $( [] ).add( name ).add( email ).add( password ),
    allFields = $( [] ).add( name ).add( wallet ),
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
    if ( o.val() == undefined || o.val().length != len) {
      o.addClass( "ui-state-error" );
      updateTips( "" + n + " 的长度必须为" + len);
      return false;
    } else {
      return true;
    }
  }

  function checkLength( o, n, min, max ) {
    console.log("checkLength " + o.val())
    if (o.val() == undefined || o.val().length > max || o.val().length < min ) {
      o.addClass( "ui-state-error" );
      updateTips( "" + n + " 的长度必须在 " +
        min + " 和 " + max + " 之间。" );
      return false;
    } else {
      return true;
    }
  }

  function checkRegexp( o, regexp, n ) {
    if (o.val() == undefined || !( regexp.test( o.val() ) ) ) {
      o.addClass( "ui-state-error" );
      updateTips( n );
      return false;
    } else {
      return true;
    }
  }

  $( "#sign-in-dialog-form" ).dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      "注册": function() {
        var bValid = true;
        allFields.removeClass( "ui-state-error" );

        bValid = bValid && checkLength( name, "username", 3, 16 );
        //bValid = bValid && checkLength( email, "email", 6, 80 );
        //bValid = bValid && checkLength( password, "password", 5, 16 );
        bValid = bValid && checkEqual( wallet, "wallet", 35);

        bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "用户名必须由 a-z、0-9、下划线组成，且必须以字母开头。" );
        // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
        //bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
        //bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "密码字段只允许： a-z 0-9" );
        bValid = bValid && checkRegexp( wallet, /^([0-9a-zA-Z])+$/, " 钱包地址由 35 位数字和字母组成" );

        if ( bValid ) {
          //$( "#users tbody" ).append( "<tr>" +
          //  "<td>" + name.val() + "</td>" +
          //  "<td>" + email.val() + "</td>" +
          //  "<td>" + password.val() + "</td>" +
          //"</tr>" );
          alert("name:" + name.val() + " wallet:" + wallet.val())
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

  $( "#sign-in" )
    .button()
    .click(function() {
      $( "#sign-in-dialog-form" ).dialog( "open" );
    });
});
