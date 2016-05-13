![WordPress logo](chrome-extension-web2wp/logo-128.png)

# Web to WordPress

A [Google Chrome](https://www.google.com.au/chrome) extension to grep through the DOM of a webpage to collect content for posting to a PHP script which will create a [WordPress](https://wordpress.org/) page. Also pulls an image file, creates it as WordPress Media and then links it as the thumbnail of the newly created post. Will also collect SEO meta data for use with the [Yoast](https://yoast.com/) plugin.


## Usage

In it's current state the script requires some jQuery dev knowledge and tweaking to your own circumstances and the DOM structure of the page your grepping.


## Setup

**Needs Expanding**

1. Put PHP script on server. Rename. Change WP location var
1. Edit `manifest.js` with the source content's domain name to permissions for the extension to run
1. Edit `popup.js` with WP URIs (see comments in the file)
1. Modify `content.js` to get the content from the page you'll run script on (see comments in the file)
1. In Chrome Developer mode add extension directory
1. Click the 'WP' logo button in your browser tool bar
1. Click create page (if nothing happens, right-click to 'inspect' the source and check errors in the dev console)
1. Check your page content in draft mode in WP admin
1. Publish your fetched content in WordPress!

## Potential

* With a very simple change this can create a WordPress page
* Split the PHP out and use the extension for posting content to different CMSs


## Tip

If you want to use excerpts on Wordpress Pages (by default they are only on for Posts), add the following to the `functions.php` file of your theme:

```
function my_add_excerpts_to_pages() {
     add_post_type_support( 'page', 'excerpt' );
}
add_action( 'init', 'my_add_excerpts_to_pages' );
```

## History

> I needed to move a 70+ static pages into WordPress - I wasn't going to do all that my hand, so I created this script to help me out. The popup allows manual tweaking of content (or to add missing content) before the page is created in WP. While it didn't save me massive amounts of time, it did increase the chance for user-error. Subsequent uses of this script is when I'll get the time saving - but you can get this ASAP as the hard parts been done.


## License

[WTFPL](http://www.wtfpl.net/)


## Credits

By [RMW Web Publishing](http://rwpublishing.net.au)