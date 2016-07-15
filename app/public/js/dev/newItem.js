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