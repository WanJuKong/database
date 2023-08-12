<?php

include("DBConnection.php");

$conn = $db['conn'];
$tableName = $_POST['table'] === 'type' ? $db['type'] : $db['info'];

$id = $_POST['id'];

$sql = "DELETE FROM {$tableName} WHERE id IN (" . implode(',', (array)$id) . ")";

if (pg_query($conn, $sql)){
	echo "Deleted successfully\n";
} else {
	echo "Error: " . pg_last_error() . "\n";
}

if (pg_query($conn, 'VACUUM')){
	echo "Vacuumed successfully";
} else {
	echo "Error: " . pg_last_error();
}

//pg_close($conn);

?>
