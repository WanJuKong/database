<?php

session_start();

if(!isset($_SESSION["db_connection"])){
	$config = parse_ini_file('/var/myapp/config.ini', true);

	$servername = "localhost";
	$port = $config['postgresql']['port'];
	$username = $config['postgresql']['username'];
	$password = $config['postgresql']['password'];
	$dbname = $config['postgresql']['dbname'];

	$tableName_info = $config['postgresql']['tableName'];
	$tableName_type = $config['postgresql']['tableName_type'];

	$connectionString = "host={$servername} port={$port} dbname={$dbname} user={$username} password={$password}";
	$conn = pg_connect($connectionString);
	if(!$conn){
		echo('Connection failed: '.pg_last_error());
		exit;
	}
	$db = array(
		'conn' => $conn,
		'info' => $tableName_info,
		'type' => $tableName_type
	);
	$_SESSION["db_connection"] = $db;
} else {
	$db = $_SESSION["db_connection"];
}

?>
