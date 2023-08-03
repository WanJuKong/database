<?php

$name = $_POST['name'];
$price = $_POST['price'];
$type = $_POST['type'];
$description = $_POST['description'];

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

$name = pg_escape_string($name);
$price = (int)pg_escape_string($price);
$type = pg_escape_string($type);
$description = pg_escape_string($description);

$sql = "INSERT INTO {$tableName} (name, price, type, description)
	VALUES('{$name}', '{$price}', '{$type}', '{$description}')";

if(pg_query($conn, $sql)){
	echo 'Elements recorded successfully';
} else {
	echo 'Error: '.pg_last_error();
}

pg_close($conn);

?>
