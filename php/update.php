<?php

include("DBConnection.php");
include("imgManage.php");

$conn = $db['conn'];
$tableName = $_POST['table'] === 'type' ? $db['type'] : $db['info'];

$id = pg_escape_string($_POST['id']);
$name = pg_escape_string($_POST['name']);
$price = pg_escape_string($_POST['price']);
$type = pg_escape_string($_POST['type']);
$description = pg_escape_string($_POST['description']);
$img_src = pg_escape_string($_POST['img_src']);

if (isset($_FILES['img'])){
	$img_src = imgUpload($_FILES['img']);
}

$img_src_sql = $img_src === "" ? "" : "img_src='{$img_src}', ";

$sql = "UPDATE {$tableName} SET 
		name='{$name}', 
		price='{$price}', 
		type='{$type}', 
		description='{$description}', 
		{$img_src_sql}
		reg_time=CURRENT_TIMESTAMP 
	WHERE id={$id}";
if(pg_query($conn, $sql)){
	echo "updated successfully.";
} else {
	echo "error:" . pg_last_error($conn);
}

pg_close($conn);

?>
