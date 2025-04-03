$(document).ready( function() {
  $("#contactForm").on("submit", function (event) {
      if (event.isDefaultPrevented()) {
          // handle the invalid form...
          formError();
          submitMSG(false, "Did you fill in the form properly?");
      } else {
          // everything looks good!
          event.preventDefault();
          submitForm();
      }
  });


  function submitForm(){
      // Initiate Variables With Form Content
      var name = $("#name").val();
      var email = $("#email").val();
      var message = "Je veux devenir Beta testeur pour PinPointPlace !";
      $.ajax({
          type: "POST",
          url: "php/form-process.php",
          data: "name=" + name + "&email=" + email + "&message=" + message,
          success : function(text){
              if (text == "success"){
                  alert("yes");
                  formSuccess();
              } else {
                  formError();
                  submitMSG(false,text);
              }
          },
          error : function(text){
          }
      });
  }

  function formSuccess(){
      $("#contactForm")[0].reset();
      submitMSG(true, "Inscription réussie ! Vous allez recevoir un email sous 24 heures. L'équipe de PinPointPlace vous remercie !")
  }

  function formError(){
      $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass();
      });
  }

  function submitMSG(valid, msg){
      if(valid){
          var msgClasses = "h3 text-center tada animated text-success";
      } else {
          var msgClasses = "h3 text-center text-danger";
      }
      $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
});
