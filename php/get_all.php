<?php

include("DBConnection.php");

$conn = $db['conn'];
$tableName = $_POST['table'] === 'type' ? $db['type'] : $db['info'];

$sql = "SELECT * FROM {$tableName}";
$DBData = pg_query($conn, $sql);
$returnArray = array();
$counts = 0;
if(pg_num_rows($DBData) > 0){
	while($row = pg_fetch_assoc($DBData)){
		array_push($returnArray, $row);
		$counts++;
	}
}
/*
if($_POST['img_get']) {
	for($i = 0; $i < $counts; $i++){
		$imgsrc = $returnArray[$i]['img_src'];
		$imgsrc = ($imgsrc === ''? "/var/myapp/uploads/imgNotFound.jpg" : $imgsrc);
		$imgData = base64_encode(file_get_contents($imgsrc));
		$returnArray[$i]['img_src'] = $imgData;
	}
}
 */
/*
if(isset($_POST['get_img']) && $_POST['get_img'] === true ){
	$sql = "SELECT id, img_src FROM {$tableName}";
	$DBData = pg_query($conn, $sql);
	$returnArray['img'] - array();
	if(pg_num_rows($DBData) > 0){
		while($row = pg_fetch_assoc($DBData)){
			$imgData = base64_encode(file_get_contents($row['img_src']));
			array_push($returnArray['img'], array (
				'id' => $row['id'],
				'img_src' => $imgData
			));
		}
	}
}
 */
echo json_encode($returnArray);

?>
