
var selectStart = "De la";
var selectStop = "Până la";
$( ".select-from" ).select2({ placeholder: selectStart });
$( ".select-to" ).select2({ placeholder: selectStop });
$( document ).ready(function() { 
	//init
var stations = {};
$.ajax({
	url:'api/v1/stations.json',
	success:function(data) {
		$.each(data.stationList,function(i,station) {
			var option = $('<option>',{
				value:station.stationId,
				text:station.name
			});	
			stations[station.stationId] = station.name;
			$("#option-group-from,#option-group-to").append(option);
		});
		if (window.location.hash) {
			//daca avem hash afisam resultatele prin schimbarea hash-ului
			//setam valorile pentru select-uri
			var ids = window.location.hash.slice(1).split('|');
			if (validateValues(ids[0],ids[1])) {
				$(window).trigger('hashchange');
				$( ".select-from" ).select2('val',ids[0]);
				$( ".select-to" ).select2('val',ids[1]);
			}
		};
	}
});
//afisam rezultatele 	
$(window).on('hashchange',function() {
   var ids = window.location.hash.slice(1).split('|');
   if (validateValues(ids[0],ids[1])) {
  	 getData(ids[0],ids[1],stations);
   };
});

$('#searchBtn').on('click', function (e) {
	var fromId =  parseInt($("#select-search-from").select2("val"));
	var toId =  parseInt($("#select-search-to").select2("val"));
	if (validateValues(fromId,toId)) {
		 window.location.hash = '#'+fromId+'|'+toId;
		// schimbam hash-ul => eventul hashchange => afisam rezultatele
	} else {
		alert('Selecteaza cele 2 locatii');
	};

});
});
function validateValues(fromId,toId) {
	if(!isNaN(toId) && !isNaN(fromId) && fromId != toId)
	{
		return true;
	}
	return false
}
function getData (fromId,toId,stations) {
	$.ajax({
			url:'api/v1/durations.json',
			success:function(data) {
				///va fi elminata  - procesarea se va face pe server
				var notLast = true,
				durations = data.durations;
				var routes = [];
				var currentRoute = fromId;
				while (notLast) {
					var currentDuration = durations[currentRoute];
					if (typeof(currentDuration) != "undefined") {
						if (currentRoute == toId) {
							notLast = false;
						}
						routes.push({
							name:stations[currentRoute],
							durations:currentDuration
						});
						currentRoute = currentDuration.endStationId;
					} else {
						var routes = [{error:true}];
						notLast = false;
					};
					
					
				}
				//se va modifica pentru a returna resultatele respectiv erorile
				$(".experiences").empty();
				$.each(routes,function(i,route) {
				if (route.error) {
					var li = '<li>Nu s-au gasit rute pentru aceste locatii</li>';
				} else {
					var li = '<li><div class="where">'+route.name+'</div><p class="description">'+route.durations.duration+' min</p></li>';	
				}
				$(".experiences").append(li);
				});
				
			}
		});
}

