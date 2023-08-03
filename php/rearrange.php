<?php

$config = parse_ini_file('/var/myapp/config.ini',true);

$servername = 'localhost';
$port = $config['postgresql']['port'];
$username = $config['postgresql']['username'];
$password = $config['postgresql']['password'];
$dbname = $config['postgresql']['dbname'];

$tableName = $config['postgresql']['tableName'];

$connection_string = (string)"host={$servername} port={$port} dbname={$dbname} user={$username} password={$password}";

$conn = pg_connect($connection_string);

if(!$conn){
	die('Connectoin failed: ' . pg_last_error());
}

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
