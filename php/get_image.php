<?php

$imgfile = $_GET["img_src"];
$extension = $_GET["extension"];

if(file_exists($imgfile)) {
	header("Content_Type:image/".$extension);
	header("Content-Disposition:attachment;filename=$file");
	header("Content-Transfer-Encoding:binary");
	header("Content-Length:".filesize($imgfile));
	header("Cache-Control:cache,must-revalidate");
	header("Pragma:no-cache");
	header("Expires:0");
	if(is_file($imgfile)){
		$f = fopen($imgfile, 'r');
		while(!feof($f)){
			$buf = fread($($f, 8096);
			$read = strlen($buf);
			print($buf);
			flush();
		}
		fclose($f);
	}
}

?>
