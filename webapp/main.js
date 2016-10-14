
var selectStart = "De la";
var selectStop = "Până la";

$( ".select-from" ).select2( { placeholder: selectStart } )
$( ".select-to" ).select2( { placeholder: selectStop } )


$('#searchBtn').on('click', function (e) {
	var fromId = $("#select-search-from").select2("val");
	var toId = $("#select-search-to").select2("val");

	if(toId != "" && fromId !="" && fromId != toId)
	{
		window.location.href = "results.html?toId="+toId+"&fromId="+fromId;
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

			function repoFormatSelection( repo ) {
				return repo.full_name;
			}

			$( ".select2-remote" ).select2({
				placeholder: "Search for a GitHub Repository",
				minimumInputLength: 1,
				// instead of writing the function to execute the request we use Select2's convenient helper
				ajax: {
					url: "https://api.github.com/search/repositories",
					dataType: "json",
					quietMillis: 250,
					data: function( term, page ) {
						return {
							// search term
							q: term
						};
					},
					results: function( data, page ) {
							// parse the results into the format expected by Select2.
							// since we are using custom formatting functions we do not need to alter the remote JSON data
							return { results: data.items };
					},
					cache: true
				},
				initSelection: function( element, callback ) {
					// the input tag has a value attribute preloaded that points to a preselected repository's id
					// this function resolves that id attribute to an object that select2 can render
					// using its formatResult renderer - that way the repository name is shown preselected
					var id = $( element ).val();

					if ( id !== "" ) {
						$.ajax( "https://api.github.com/repositories/" + id, {
							dataType: "json"
						}).done( function( data ) {
							callback( data );
						});
					}
				},
				formatResult: repoFormatResult,
				formatSelection: repoFormatSelection,
				// apply css that makes the dropdown taller
				dropdownCssClass: "bigdrop",
				// we do not want to escape markup since we are displaying html in results
				escapeMarkup: function( m ) {
					return m;
				}
			});

			$( "button[data-select2-open]" ).click( function() {
				$( "#" + $( this ).data( "select2-open" ) ).select2( "open" );
			});

			
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


