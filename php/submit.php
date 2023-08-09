<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("DBConnection.php");

$conn = $db['conn'];
$tableName = $_POST['table'] === 'type' ? $db['type'] : $db['info'];


$name = pg_escape_string($_POST['name']);
$price = (int)pg_escape_string($_POST['price']);
$type = pg_escape_string($_POST['type']);
$description = pg_escape_string($_POST['description']);


if (isset($_FILES['img'])) {
	$file = $_FILES['img'];
	$dir = "/home/juwan/pictures/";
	$extension = pathinfo($file["name"], PATHINFO_EXTENSION);
	if ($extension != "jpeg" && $extension != "jpg" && $extension != "png") {
		echo "Error: Invalid image extension.\n";
	} else {
		$img_src = $dir.date("Y_m_d_h_i_s_").basename($file["name"]);
		if(move_uploaded_file($file["tmp_name"], $img_src)){
			echo "uploaded successfully.\n";

		} else {
			echo "upload failed.\n";
		}
	}
}

$name = pg_escape_string($name);
$price = (int)pg_escape_string($price);
$type = pg_escape_string($type);
$description = pg_escape_string($description);

$sql = "INSERT INTO {$tableName} (name, price, type, description, img_src)
	VALUES('{$name}', '{$price}', '{$type}', '{$description}', '{$img_src}')";

if(pg_query($conn, $sql)){
	echo 'Elements recorded successfully';
} else {
	echo 'Error: '.pg_last_error();
}

pg_close($conn);

?>
