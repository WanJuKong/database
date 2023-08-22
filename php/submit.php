<?php

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

include("DBConnection.php");
include("imgManage.php");

$conn = $db['conn'];
$tableName = $_POST['table'] === 'type' ? $db['type'] : $db['info'];


$name = pg_escape_string($_POST['name']);
$price = pg_escape_string$_POST['price'];
$type = pg_escape_string($_POST['type']);
$description = pg_escape_string($_POST['description']);

$img_src = '';

if (isset($_FILES['img'])) {
	$img_src = imgUpload($_FILES['img']);
}

/*
$img_src = '';

if (isset($_FILES['img'])) {
	$file = $_FILES['img'];
	$dir = "/var/myapp/uploads/";
	$extension = pathinfo($file["name"], PATHINFO_EXTENSION);
	$extensionAllowed = array("jpg", "jpeg", "png");

	if (!in_array($extension, $extensionAllowed)) {
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
*/
$sql = "INSERT INTO {$tableName} (name, price, type, description, img_src)
	VALUES($1, $2, $3, $4, $5)";
$params = array($name, $price, $type, $description, $img_src);

if(pg_query_params($conn, $sql, $params)){
	echo 'Elements recorded successfully';
} else {
	echo 'Error: '.pg_last_error();
}

//pg_close($conn);

?>
