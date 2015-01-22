var oauthKeys = '';
var oClient = '';
$(function(){
	console.log('canvas app init');
	ajaxGetOauthKeys();
	//initCanvasCtx();

	$('#btngreen').on('click', function(){
		console.log('Click Green');
		// Sfdc.canvas(function() {
    		Sfdc.canvas.client.publish(
    			oClient,
        		{
        			name : "greenClickCanvas", 
        			payload : {status : 'Completed'}
        		}
        	);
		// });

	});
	// $('#btnyellow').on('click', function(){
	// 	console.log('Click Yellow');
	// });
	// $('#btnred').on('click', function(){
	// 	console.log('Click Red');
	// });

	$('#btnInsertContact').on('click', function(e){
		e.preventDefault();
		var outboundPayload = {
			FirstName : $('#infn').val(),
			LastName : $('#inln').val()
		};
		Sfdc.canvas.client.publish(
			oClient,
    		{
    			name : "insertContact", 
    			payload : outboundPayload
    		}
        );

	}); 

	Sfdc.canvas.client.subscribe(oClient, 
		[
			{
				name : 'VFGreenClick',
		        onData : function (e) {
		            console.log(e);
		        }
	        },
	        {
				name : 'SuccessfulDML',
		        onData : function (e) {
		            console.log(e);
		            showAlertBanner();
		        }
	        }
        ]
    );
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
		instanceId: "_:CanvasDemo:cidappdemo",
		instanceUrl:"http://eu3.salesforce.com:8080",
		oauthToken: payload.id_token,
		refreshToken: payload.access_token,
		targetOrigin: "https://c.eu3.visual.force.com"
	}

}
	
function showAlertBanner(){
	$('#successAlert').removeClass('hide');
	setTimeout(function(){ 
		$('#successAlert').addClass('hide') 
	}, 3000);
}


function initCanvasCtx(){
	console.log('initCanvasCtx');
	Sfdc.canvas.client.ctx(logmsg, oClient);
}

function logmsg(msg){

	console.log(msg);
}

