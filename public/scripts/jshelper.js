var oauthKeys = '';
var oClient = '';
$(function(){
	console.log('canvas app init');
	ajaxGetOauthKeys();
	$('#btngreen').on('click', function(){
		console.log('Click Green');
		Sfdc.canvas(function() {
    		Sfdc.canvas.client.publish(
    			oClient,
        		{
        			name : "greenClickCanvas", 
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

	Sfdc.canvas.client.subscribe(
		oClient,
		{
			name : 'VFGreenClick',
	        onData : function (e) {
	            console.log(e);
        }
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
    		setoClient(JSON.parse(response));
		}
	});
}

function setoClient(payload){
	oClient = {
		instanceId: "_CanvasDemo",
		instanceUrl:"http://eu3.salesforce.com:8080",
		oauthToken: payload.id_token,
		refreshToken: payload.access_token,
		targetOrigin: "https://c.eu3.visual.force.com"
	}

}
