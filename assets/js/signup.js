/*$.getJSON("http://localhost:8080/getDashboardMmaster",
   function(data) {
     alert(JSON.stringify(data));
});
function test() {
	alert("test")
}*/

/*$(document).ready(function() {
    $.noty.defaults = {
        layout: "topCenter",
        theme: "defaultTheme",
        type: "error",
        text: "",
        dismissQueue: true,
        template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
        animation: {
            open: {
                height: "toggle"
            },
            close: {
                height: "toggle"
            },
            easing: "swing",
            speed: 500
        },
        timeout: 8500,
        force: false,
        modal: false,
        maxVisible: 5,
        killer: false,
        closeWith: ["click"],
        callback: {
            onShow: function() {},
            afterShow: function() {},
            onClose: function() {},
            afterClose: function() {}
        },
        buttons: false
    };
    $("form *[type=submit]").click(function() {
        $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true")
    });
    $.validator.addMethod("alphaNumeric", function(value, element) {
        return this.optional(element) || /^[0-9a-zA-Z]+$/.test(value)
    }, "Secret PIN must contain only numbers and letters");
    $.validator.setDefaults({
        onkeyup: false,
        onclick: false,
        onfocusout: false,
        onfocusin: false,
        onkeydown: false,
        onsubmit: true,
        rules: {
            name: {
                minlength: 2,
                required: true
            },
            "user[email]": {
                email: true,
                required: true
            },
            subject: {
                minlength: 2,
                required: true
            },
            pin_new: {
                minlength: 8,
                alphaNumeric: true,
                required: true
            },
            pin_new_confirm: {
                equalTo: "#pin_new",
                required: true
            },
            "user[password]": {
                minlength: 8,
                required: true
            },
            "user[password_confirmation]": {
                equalTo: "#user_password",
                required: true
            },
            "contact[email]": {
                required: true,
                email: true
            },
            "contact[name]": {
                required: true,
                minlength: 1
            },
            "contact[message]": {
                minlength: 10,
                required: true
            },
            amount: {
                number: true,
                required: true
            }
        },
        messages: {
            "user[password]": {
                required: "Please enter your password.",
                minlength: jQuery.validator.format("Passwords must be at least {0} characters."),
            },
            "user[password_confirmation]": {
                required: "Please confirm your password.",
                equalTo: "Password and confirmed password fields do not match."
            },
            pin_new: {
                required: "Please enter a Secret PIN.",
                minlength: jQuery.validator.format("Secret PIN must be at least {0} character."),
            },
            pin_new_confirm: {
                equalTo: "Secret PINs do not match.",
                required: "Please confirm your Secret PIN."
            },
            "user[email]": {
                required: "Please enter your email address."
            },
            "contact[email]": {
                required: "Please enter your email address."
            },
            "contact[message]": {
                required: "Please enter a message.",
                minlength: "Message is too short."
            },
            "contact[name]": {
                required: "Please enter your name."
            },
            payment_address: {
                required: "Please enter a valid payment (destination) address."
            },
            amount: {
                required: "Please enter an amount of coins to send.",
                number: "Amount must be a number."
            },
            pin_current: {
                required: "Please enter your Secret PIN."
            }
        },
        submitHandler: function() {
            var sbutton = $("*[type=submit][clicked=true]");
            if (sbutton.hasClass("api-submit") == false) {
                sbutton.addClass("disabled");
                sbutton.parents("form").get(0).submit()
            }
        },
        errorPlacement: function(error, element) {
            noty({
                text: error.text()
            })
        }
    });
    $("form").each(function() {
        $(this).validate()
    })
});
*/


function signUp() {

	 var email = $("#user_email").val();
	 var password = $("#user_password").val();
	 var confirmpass = $("#user_password_confirmation").val();

	//  if(name =="" || password=="" || confirmpass=="" ){
	// 	 $.injectCSS({
	// 		    "#test": {
	// 		        height: 123
	// 		    }
	// 		});
	// 	 return;
	//  }

	 if( password !=confirmpass )
		 return;
	 //alert("clear all validation")
	 var sendInfo = {email: email,password: password};
	 	console.log(sendInfo.email+ " ::: "+ sendInfo.password);
	       $.ajax({
	    	   beforeSend: function(xhrObj){
	    	        xhrObj.setRequestHeader("Content-Type","application/json");
	    	        xhrObj.setRequestHeader("Accept","application/json");
	    	    },
	           type: "POST",
	           url: "http://localhost:1337/user/create",
	           dataType: "json",

	           success: function (msg) {
	               if (msg) {
	                   alert("User created Succesfully !!"+JSON.stringify(msg));
										window.location.href = "/signin";

	               } else {
	                   alert("Cannot created !"+JSON.stringify(msg));
	               }
	           },
						  error: function(XMLHttpRequest, textStatus, errorThrown) {
						     alert(textStatus+"  some error  "+errorThrown);
						  }



						 ,

	           data: JSON.stringify(sendInfo)
	       });

}
