<?php

$id = $_POST['id'];
$config = parse_ini_file('/var/myapp/config.ini', true);

$servername ='localhost';
$port = $config['postgresql']['port'];
$username = $config['postgresql']['username'];
$password = $config['postgresql']['password'];
$dbname = $config['postgresql']['dbname'];

$connection_string = (string)"host={$servername} port={$port} dbname={$dbname} user={$username} password={$password}";

$conn = pg_connect($connection_string);
if(!$conn){
	die('Connection failed: ' . pg_last_error());
}

$sql = "DELETE FROM list WHERE id IN (" . implode(',', (array)$id) . ")";

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

pg_close($conn);

?>

