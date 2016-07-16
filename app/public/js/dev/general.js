$(document).ready(function(){

	$('.signOut').on('click',signOut);

});

function onSignIn(googleUser) {   // when user auth this function will call
   // Useful data for your client-side scripts:
   $('#loggedIn').show();
   $('.g-signin2').hide();
	var profile = googleUser.getBasicProfile();
	$('#loggedIn .greeting').html("שלום "+profile.getName());

	localStorage.setItem("email",profile.getEmail());
	if(localStorage["email"]=="avitalg91@gmail.com"){
		localStorage.setItem("admin",true);
		$(".manage-page").show();
	}else{
		localStorage.setItem("admin",false);
	}
};


function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.disconnect().then(function () {
    	console.log('User signed out.');
    	$('#loggedIn').hide();
    	$('.g-signin2').show();
	});
}