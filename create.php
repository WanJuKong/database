<?php

$config = parse_ini_file('/var/myapp/config.ini', true);

$servername = 'localhost';
$username = $config['postgresql']['username'];
$password = $config['postgresql']['password'];
$dbname = $config['postgresql']['dbname'];

$conn = new mysqli($servername, $username, $password);

$sql = "CREATE DATABASE $dbname";
if ($conn->query($sql) === TRUE) {
	echo 'Database created';
} else {
	echo 'Error creating database: '.$conn->error;
}
pg_close($conn);

?>
