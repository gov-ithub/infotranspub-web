function getParameterByName(name,url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var locationStub = '<li class="[color]"><div class="where">[StationName]</div><p class="description">[Duration]</p></li>';
var legList = [];

$( document ).ready(function() {
    // console.log( stationData.stationList[0].name );
    var toId = parseInt(getParameterByName("toId"));
    var fromId = parseInt(getParameterByName("fromId"));
    legList = [];
    if(fromId < toId)
    {
	    for(var i =fromId-1;i<toId-1;i++)
	    {
	    	var leg = {};
	    	leg.fromName = stationData.stationList[i].name;
	    	leg.toName = stationData.stationList[i+1].name;
	    	leg.duration = durData.durations[i].duration;
	    	legList.push(leg);
	    	console.log( leg );
	    }
	    console.log( legList.length );
	}
	else
	{
		for(var i =fromId-1;i>toId-1;i--)
	    {
	    	var leg = {};
	    	leg.fromName = stationData.stationList[i].name;
	    	leg.toName = stationData.stationList[i-1].name;
	    	leg.duration = durData.durations[i-1].duration;
	    	legList.push(leg);	    	
	    }
	}

	addTrip(legList);
		
	
    
});

function addTrip(legList)
{
	if(legList.length<=6)
	{
		addFullTrip(legList);		
	}
	else
	{
		addPartialTrip(legList);
	}
}

function addFullTrip(legList)
{
	var totalTripDuration = 0;
	for(i=0;i<legList.length;i++)
	{	
		if(i==0)
		{
			addFirstLi(i,legList);
		}
		else
		{
			addGreenLi(i,legList);
		}
		if(i == legList.length -1 )
		{
			addEndLi(i,legList);
		}
		totalTripDuration+=legList[i].duration;
	}

	$(".routeInfo").append("<span>"+"Durata călătoriei: "+totalTripDuration+" min"+'</span>');
}

function addPartialTrip(legList)
{
	if(legList.length<=6)
	{
		addFullTrip(legList);
		return;
	}

	var totalTripDuration = 0;
	var sectionedTripDuration = 0;
	for(i=0;i<legList.length;i++)
	{	
		if(i==0)
		{
			addFirstLi(i,legList);
		}
		else
		{
			if(i==1 || i==2 || i== legList.length -2 || i==  legList.length -1)
			{
				addGreenLi(i,legList);
			}
			else
			{
				sectionedTripDuration+=legList[i].duration;
				if (i== legList.length -3)
				{
					addMoreLi(legList.length-5,sectionedTripDuration);
				}
			}
		}
		if(i == legList.length -1 )
		{
			addEndLi(i,legList);
		}
		totalTripDuration+=legList[i].duration;
	}
	
	$(".routeInfo").append("<span>"+"Durata călătoriei: "+totalTripDuration+" min"+'</span>');
}

function addFirstLi(i,legList)
{
	var currentStub = locationStub.replace("[color]","green");
		currentStub = currentStub.replace("[StationName]",legList[i].fromName);
		currentStub = currentStub.replace("[Duration]",legList[i].duration+" min");
		$(".experiences").append(currentStub);
}

function addGreenLi(i,legList)
{
	var currentStub = locationStub.replace("[color]","blue");
		currentStub = currentStub.replace("[StationName]",legList[i].fromName);
		currentStub = currentStub.replace("[Duration]",legList[i].duration+" min");
		$(".experiences").append(currentStub);
}

function addEndLi(i,legList)
{
	var currentStub = locationStub.replace("[color]","red");
			currentStub = currentStub.replace("[StationName]",legList[i].toName);
			currentStub = currentStub.replace("[Duration]","");
			$(".experiences").append(currentStub);
}

function addMoreLi(numberOfStations, totalDuration)
{
	var currentStub = locationStub.replace("[color]","details");
			currentStub = currentStub.replace("[StationName]","Alte "+numberOfStations+" staţii");
			currentStub = currentStub.replace("[Duration]",totalDuration+" min");
			$(".experiences").append(currentStub);
}

