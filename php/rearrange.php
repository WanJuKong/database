<?php

include("DBConnection.php");

$conn = $db['conn'];
$tableName = $_POST['table'] === 'type' ? $db['type'] : $db['info'];

$sql = "SELECT id FROM {$tableName} ORDER BY id";
$result = pg_query($conn, $sql);

if($result){
	$newID = 1;
	while($row = pg_fetch_assoc($result)){
		$oldID = $row['id'];
		$sql = "UPDATE {$tableName} SET id = {$newID} WHERE id = {$oldID}";
		if(!pg_query($conn, $sql)){
			echo 'Error rearranging: ' . pg_last_error();
			break;
		}
		$newID++;
	}
	echo 'Elements rearranged successfully';
} else {
	echo 'Error: '.pg_last_error();
}

pg_close($conn);

?>
