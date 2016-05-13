<?php

// Tool to create a Wordpress post
// called from AJAX

// NOTE: There is no security on this file (not even an Admin check). It's suggested you give this an obscure file name in an obscure directory with some Auth control. Then delete the file when done.

require('../wordpress/wp-load.php'); // change this to the location of your WP install

header("Access-Control-Allow-Origin: *");

$post_parent 				= 82; // when making child posts
$post_author 				= 3; // the id for the user account
$slug						= $_GET['slug'];
$post_title 					= $_GET['post_title'];
$menu_order 				= $_GET['menu_order'];
$post_excerpt 				= $_GET['post_excerpt'];
$post_content 				= $_GET['post_content'];
$_yoast_wpseo_metadesc 		= $_GET['_yoast_wpseo_metadesc'];
$_yoast_wpseo_metakeywords 	= $_GET['_yoast_wpseo_metakeywords'];
$image_url 					= $_GET['image_url'];
$image_alt 					= $_GET['image_alt'];

function Generate_Featured_Image( $image_url, $image_meta, $post_id ){
    $upload_dir = wp_upload_dir();
    $image_data = file_get_contents($image_url);
    $filename = basename($image_url);
    if ( wp_mkdir_p($upload_dir['path']) )
    	$file = $upload_dir['path'] . '/' . $filename;
    else
    	$file = $upload_dir['basedir'] . '/' . $filename;
    file_put_contents($file, $image_data);

    $wp_filetype = wp_check_filetype($filename, null );
    $attachment = array(
        'post_mime_type' => $wp_filetype['type'],
//        'post_title' => sanitize_file_name($filename),
		'post_title'		=> $image_meta['title'],
        'post_content'	=> '',
        'post_status'	=> 'inherit'
    );
    $attach_id = wp_insert_attachment( $attachment, $file, $post_id );
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    $attach_data = wp_generate_attachment_metadata( $attach_id, $file );
    $res1= wp_update_attachment_metadata( $attach_id, $attach_data );
    $res2= set_post_thumbnail( $post_id, $attach_id );
}

$slug = sanitize_title($post_title);

$meta = array(
	'_yoast_wpseo_metadesc'		=> $_yoast_wpseo_metadesc,
	'_yoast_wpseo_metakeywords'	=> $_yoast_wpseo_metakeywords
);

$args = array(
	'post_parent'	=> $post_parent,
	'post_type'		=> 'page',
	'page_template'	=> 'template-qs.php',
	'post_name'		=> $slug,
	'menu_order'	=> $menu_order,
	'post_author'	=> $post_author,
	'post_title'		=> $post_title,
	'post_excerpt'	=> $post_excerpt,
	'post_content'	=> $post_content,
	'meta_input'	=> $meta
);

$result = wp_insert_post( $args, true );

if ( is_numeric($result) ) {
	if ( !empty($image_url) ) {
		Generate_Featured_Image( $image_url, array('title' => $image_alt), $result );
	}
}

echo json_encode( array('result' => $result) );