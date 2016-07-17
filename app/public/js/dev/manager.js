$(document).ready(function(){
  $('.radioPtype').click(function() {
     if($("[value='cat']").is(':checked')) {
        $('.bigImage').fadeOut();
        $('.prodValues').fadeOut();
        $("input[name='fileToUpload2']").prop('required',false);

    }
    if($("[value='prod']").is(':checked')) {
      $('.bigImage').fadeIn();
      $('.prodValues').fadeIn();
      $("input[name='fileToUpload2']").prop('required',true);

    }
  });

  if(!localStorage['admin']){
    $('.new-item').html('הדף אינו זמין');
  }
});


function onSignIn(googleUser) {
         // Useful data for your client-side scripts:
               $('#loggedIn').show();
               $('.g-signin2').hide();
               $('.account').show();
                var profile = googleUser.getBasicProfile();
                $('#loggedIn .greeting').html("שלום "+profile.getName());
                this.loggedIn=true; 

                localStorage.setItem("email",profile.getEmail());

                if(localStorage["email"]=="avitalg91@gmail.com"){
                    localStorage.setItem("admin",true);
                    $(".manage-page").show();
                }else{
                    localStorage.setItem("admin",false);
                }

                if(!localStorage["email"]){
                   $.get("https://webserviceproj.herokuapp.com/api/addUser/"+localStorage.email+"/"+localStorage.admin, function(data, status){
                  });
                }


};


 function onSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect().then(function () {
    $('#loggedIn').hide();
    $('.g-signin2').show();
    $('.account').hide();
    $('.manage-page').hide();
    localStorage.removeItem("email");
    localStorage.removeItem("admin");
    });

  };
