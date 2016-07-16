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
                console.log(localStorage.email);
                if(localStorage["email"]=="avitalg91@gmail.com"){
                    localStorage.setItem("admin",true);
                    $(".manage-page").show();
                }else{
                    localStorage.setItem("admin",false);
                }

                 $.get("https://webserviceproj.herokuapp.com/api/addUser/"+localStorage.email+"/"+localStorage.admin, function(data, status){
                    alert("Data: " + data + "\nStatus: " + status);
                });


          //  $http.get("https://webserviceproj.herokuapp.com/api/addUser/"+localStorage.email+"/"+localStorage.admin)
          // .success(function(data){
          //     if(data["success"]){
          //       $(".hello-user").html("תודה על הצטרפותך");
          //     } else if(data["error"]){
          //       $(".hello-user").html("שמחים שחזרת אלינו");
          //           $http.get("https://webserviceproj.herokuapp.com/api/getUser/"+localStorage.email)
          //           .success(function(data){
          //               if(data["admin"]){
          //                   $(".manage-page").show();
          //               }
          //           });
          //     }
          // })
          // .error(function(data, status){
          //     console.log(data);
          // });
};



