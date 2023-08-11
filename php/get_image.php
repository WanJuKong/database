<?php

$imgfile = $_GET["img_src"] !== '' ? $_GET["img_src"] : "/var/myapp/uploads/imgNotFound.jpg";
$extension = $_GET["extension"] !== '' ? $_GET["extension"] : "jpg";

if(file_exists($imgfile)) {
	header("Content-Type:image/".$extension);
	header("Content-Disposition:inline");
	header("Content-Transfer-Encoding:binary");
	header("Content-Length:".filesize($imgfile));
	header("Cache-Control:cache,must-revalidate");
	header("Pragma:no-cache");
	header("Expires:0");
	if(is_file($imgfile)){
		$f = fopen($imgfile, 'rb');
		while(!feof($f)){
			$buf = fread($f, 8096);
			$read = strlen($buf);
			print($buf);
			flush();
		}
		fclose($f);
	}
}

?>
