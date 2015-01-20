$(function(){
	console.log('canvas app init');
	$('#btngreen').on('click', function(){
		console.log('Click Green');
	});
	$('#btnyellow').on('click', function(){
		console.log('Click Yellow');
	});
	$('#btnred').on('click', function(){
		console.log('Click Red');
	});
});

function ajaxGetOauthKeys(){
	$.get("/ajaxGetOauthKeys", function(string) {
    	console.log(string);
	});
}
