var oauthKeys = '';
$(function(){
	console.log('canvas app init');
	ajaxGetOauthKeys();
	$('#btngreen').on('click', function(){
		console.log('Click Green');
		Sfdc.canvas(function() {
    		sr = oauthKeys;
    		Sfdc.canvas.client.publish(
    			sr.client,
        		{
        			name : "greenClick", 
        			payload : {status : 'Completed'}
        		}
        	);
		});

	});
	$('#btnyellow').on('click', function(){
		console.log('Click Yellow');
	});
	$('#btnred').on('click', function(){
		console.log('Click Red');
	});
});

function ajaxGetOauthKeys(){
	// $.get("/ajaxOauthKeys", function(response) {
 //    	oauthKeys = JSON.parse(response);
	// });
	$.ajax({
  		url: "/ajaxOauthKeys",
  		async: false,
  		success: function(response) {
    		oauthKeys = JSON.parse(response);
		}
	});
}
