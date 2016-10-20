
var selectStart = "De la";
var selectStop = "Până la";


$( document ).ready(function() { 
	for(var i =0;i<stationData.stationList.length;i++)
	{
		$("#option-group-from").append('<option value="'+stationData.stationList[i].stationId+'">'+stationData.stationList[i].name+'</option>');	
		$("#option-group-to").append('<option value="'+stationData.stationList[i].stationId+'">'+stationData.stationList[i].name+'</option>');
	}
	
});


$( ".select-from" ).select2( { placeholder: selectStart } )
$( ".select-to" ).select2( { placeholder: selectStop } )


$('#searchBtn').on('click', function (e) {
	var fromId = $("#select-search-from").select2("val");
	var toId = $("#select-search-to").select2("val");

	if(!isNaN(toId) && !isNaN(fromId) && parseInt(fromId) != parseInt(toId))
	{		
		window.location.href = "results.html?toId="+parseInt(toId)+"&fromId="+parseInt(fromId);
	}

})

// @see https://github.com/ivaynberg/select2/commit/6661e3
function repoFormatResult( repo ) {
	var markup = "<div class='select2-result-repository clearfix'>" +
		"<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
		"<div class='select2-result-repository__meta'>" +
			"<div class='select2-result-repository__title'>" + repo.full_name + "</div>";
	if ( repo.description ) {
		markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
	}
	markup += "<div class='select2-result-repository__statistics'>" + 
				"<div class='select2-result-repository__forks'><span class='glyphicon glyphicon-flash'></span> " + repo.forks_count + " Forks</div>" +
				"<div class='select2-result-repository__stargazers'><span class='glyphicon glyphicon-star'></span> " + repo.stargazers_count + " Stars</div>" +
				"<div class='select2-result-repository__watchers'><span class='glyphicon glyphicon-eye-open'></span> " + repo.watchers_count + " Watchers</div>" +
			"</div>" +
		"</div></div>";
	return markup;
}

			
var select2OpenEventName = "select2-open";
$( ":checkbox" ).on( "click", function() {
	$( this ).parent().nextAll( "select" ).select2( "enable", this.checked );
});
			

$( ".select2, .select2-multiple, .select2-allow-clear, .select2-remote" ).on( select2OpenEventName, function() {
	if ( $( this ).parents( "[class*='has-']" ).length ) {
		var classNames = $( this ).parents( "[class*='has-']" )[ 0 ].className.split( /\s+/ );
		for ( var i = 0; i < classNames.length; ++i ) {
			if ( classNames[ i ].match( "has-" ) ) {
				$( "#select2-drop" ).addClass( classNames[ i ] );
			}
		}
	}
});




