var oauthKeys = '';
var oClient = '';
$(function(){
	console.log('canvas app init');
	$('#containerdt').hide();
	ajaxGetOauthKeys();

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
	        },
	        {
				name : 'writeNewTitle',
		        onData : function (e) {
		            overWriteTitle(e);
		        }
	        },
	        {
				name : 'passTblData',
		        onData : function (e) {
		            configuredtcontact(e);
		        }
	        }
        ]
    );
});

function publishnav(Id){
	Sfdc.canvas.client.publish(
		oClient,
		{
			name : "openContact", 
			payload : Id
		}
	);
}

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
	$('#infn, #inln').val('');
	$('#successAlert').removeClass('hide');
	setTimeout(function(){ 
		$('#successAlert').addClass('hide') 
	}, 4000);
}

function overWriteTitle(newtitle){
	$('#tarHeader').text(newtitle);
};

function configuredtcontact(tbldata){

	$('#containerdt').show();
	$('#dtupdate').dataTable( {
		"data": tbldata,
		"columns": [
            { "title": "FirstName", "data": "FirstName"},
            { "title": "LastName", "data": "LastName"},
            { "title": "Navigation", "fnRender": function (oObj) {
            		console.log(oObj);
                    //return '<button class="cnvnav" onclick=publishnav(' + data.Id +');>Open in new tab</button>';
                  }
            }
        ],
		"pageLength" : 5,
		"bLengthChange": false 
    });
}

function initCanvasCtx(){
	console.log('initCanvasCtx');
	Sfdc.canvas.client.ctx(logmsg, oClient);
}

function logmsg(msg){

	console.log(msg);
}

