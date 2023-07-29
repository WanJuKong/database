<?php

$name = $_POST['name'];
$age = $_POST['age'];
$email = $_POST['email'];

$config = parse_ini_file('/var/myapp/config.ini',true);

$servername = 'localhost';
$port = $config['postgresql']['port'];
$username = $config['postgresql']['username'];
$password = $config['postgresql']['password'];
$dbname = $config['postgresql']['dbname'];

$connection_string = (string)"host={$servername} port={$port} dbname={$dbname} user={$username} password={$password}";

$conn = pg_connect($connection_string);
if(!$conn){
	die('Connectoin failed: ' . pg_last_error());
}

$name = pg_escape_string($name);
$age = (int)pg_escape_string($age);
$email = pg_escape_string($email);

$sql = "INSERT INTO list (name, age, email)
	VALUES('$name', '$age', '$email')";

if(pg_query($conn, $sql)){
	echo 'success!';
} else {
	echo 'error: '.pg_last_error();
}

pg_close($conn);

?>
