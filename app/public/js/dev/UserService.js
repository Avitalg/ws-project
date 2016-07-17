var UserService = angular.module('UserService', [])
.service('user', ['$http',function ($http) {
    this.onSignIn = function(googleUser) {
         // Useful data for your client-side scripts:
        $('#loggedIn').show();
        $('.g-signin2').hide();
        $('.account').show();
        var profile = googleUser.getBasicProfile();
        $('#loggedIn .greeting').html("שלום "+profile.getName());

        localStorage.setItem("email",profile.getEmail());

        

        $http.get("https://webserviceproj.herokuapp.com/api/getUser/"+localStorage.email)
	     .success(function(data){
	     if(!data["error"]){
            localStorage["admin"] = data["admin"];
            if(localStorage["admin"]){
             $(".manage-page").show();
                localStorage["admin"] = data["admin"];
             }
	       	$(".hello-user").html("תודה על הצטרפותך");
	        } else if(data["error"]){
    	       	$(".hello-user").html("שמחים שחזרת אלינו");
                  $http.get("https://webserviceproj.herokuapp.com/api/getUser/"+localStorage.email)
                    .success(function(data){
                        if(data["admin"]){
                            $(".manage-page").show();
                            localStorage["admin"] = data["admin"];
                        }
                    });
	        }
	    });
    };
    this.onSignOut = function(gapi) {
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

}]);