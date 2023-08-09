<?php

include("DBConnection.php");

$conn = $db['conn'];
$tableName = $_POST['table'] === 'type' ? $db['type'] : $db['info'];

$sql = "SELECT * FROM {$tableName}";
$DBData = pg_query($conn, $sql);
$returnArray = array();

if(pg_num_rows($DBData) > 0){
	while($row = pg_fetch_assoc($DBData)){
		array_push($returnArray, $row);
	}
}

pg_close($conn);

echo json_encode($returnArray);

?>
