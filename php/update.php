<?php

$id = pg_escape_string($_POST['id']);
$name = pg_escape_string($_POST['name']);
$price = pg_escape_string($_POST['price']);
$type = pg_escape_string($_POST['type']);
$description = pg_escape_string($_POST['description']);

$config = parse_ini_file("/var/myapp/config.ini", true);

$servername ='localhost';
$port = $config['postgresql']['port'];
$username = $config['postgresql']['username'];
$password = $config['postgresql']['password'];
$dbname = $config['postgresql']['dbname'];

$tableName = $config['postgresql']['tableName'];

$connection_string = (string)"host={$servername} port={$port} dbname={$dbname} user={$username} password={$password}";

$conn = pg_connect($connection_string);
if(!$conn){
        die('Connection failed: ' . pg_last_error());
}

$sql = "UPDATE {$tableName} SET 
		name='{$name}', 
		price='{$price}', 
		type='{$type}', 
		description='{$description}' 
	WHERE id={$id}";
if(pg_query($conn, $sql)){
	echo "updated succeddfully.";
} else {
	echo "error:" . pg_last_error($conn);
}

pg_close($conn);

?>
