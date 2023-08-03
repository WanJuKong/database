<?php

$config = parse_ini_file('/var/myapp/config.ini', true);

$servername = 'localhost';
$port = $config['postgresql']['port'];
$username = $config['postgresql']['username'];
$password = $config['postgresql']['password'];
$dbname = $config['postgresql']['dbname'];

if($_POST['type'] === 'info') {
	$tableName = $config['postgresql']['tableName'];
} else {
	$tableName = $config['postgresql']['tableName_type'];
}

$connection_string = (string)"host={$servername} port={$port} dbname={$dbname} user={$username} password={$password}";

$conn = pg_connect($connection_string);
if(!$conn){
	die('Connection failed: ' . pg_last_error());
}

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
