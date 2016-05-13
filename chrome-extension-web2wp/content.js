// inserted into browser loaded pages where permissions allow
// talks to popup.js when requested
// use this file to collect the content from the webpage

function getSlug() {
	var url = window.location.pathname;
	url = url.split('/');
	return url.pop();
}

function getTitle() {
	var title = jQuery('title').text().split(' - ')[0]; // mod to get the page name from the document title
	return title;
}

function getMenuOrder() {
	return jQuery('#issue strong').text().split('#')[1];
}

/*
function getExcerpt() {
	var excerpt = window.prompt('Excerpt?');
	return excerpt;
}
*/

function getContent() {
	var content = jQuery('#content').html();
	content = content.replace(/<p>/g, ''); // strip the paragraphs as WP prefers carriage returns
	content = content.replace(/<\/p>/g, "\n");
	content = content.trim();
	return content;
}

function getDescription() {
	return jQuery('meta[name="description"]').attr('content');
}

function getKeywords() {
	return jQuery('meta[name="keywords"]').attr('content');
}

function getImgSrc() {
	return jQuery('img')[0].src; // gets the full uri not just the relative 'src' value
}

function getImgAlt() {
	return jQuery('img').attr('alt');
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

		if (request.method == "getText") {

			var data = {
					slug: getSlug(),
					post_title: getTitle(),
					menu_order: getMenuOrder(), // comment out if not needed or undefinable
//					post_excerpt: getExcerpt(),
					_yoast_wpseo_metadesc: getDescription(), // drop these two if you don't have the yoast plugin installed
					_yoast_wpseo_metakeywords: getKeywords(), // or modify to post to the 'tags' field if creating posts
					image_url: getImgSrc(),
					image_alt: getImgAlt(),
					post_content: getContent()
				}

			sendResponse({
				data: data,
				method: "getText"
			});
		}
	}
);