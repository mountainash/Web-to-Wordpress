// The location to the PHP script location on server
var scriptloc = 'http://www.domainname.com/lkmdsoiu2ndh2lk/'; // add trailing slash

// The location to WordPress - when the page is added a new window will open to the new page in WP Admin ready to publish
var wploc = 'http://www.domainname.com/wordpress/'; // add trailing slash

// Regex-pattern to check URLs against.
// It matches URLs like: http[s]://[...]domainname.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?domainname\.com/;

document.addEventListener('DOMContentLoaded', function() {

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

			if ( urlRegex.test(tabs[0].url) ) {

				chrome.tabs.sendMessage(tabs[0].id, {method: "getText"}, function(response) {
					if ( response.method == "getText" ) {
						data = response.data;

//						$('#debug').val( JSON.stringify(data) );

						$.each(data, function( index, value ) {
							$('#'+index).val( value ).trigger('input');
						});
					}
				});

			} else {

				alert( 'You need to use this extentions on a specific web page.' );

			}
		});

});

$(function() {

	$('fieldset input').on('input', function() {
		var $_this = $(this);
		if ( $_this.val() == '' ) {
			$_this.addClass('empty');
		} else {
			$_this.removeClass('empty');
			$_this.removeClass('error');
		}

	});

	$('form').on('submit', function() {
/*
		var error = false;

		$('fieldset input').each(function() {
			if ( $(this).val() == '') {
				$(this).addClass('error');
				error = true;
			}
		});

		if ( !error ) return; // don't submit to server
*/

		var data = $(this).serialize();
		$.getJSON(scriptloc+'wp-create-page.php', data)
		  .done(function( data ) {

			if ( $.isNumeric(data.result) ) {
				window.open(wploc+'wp-admin/post.php?post='+data.result+'&action=edit');
			} else {
				alert( data );
			}

		  });

		  return false;

	});

});