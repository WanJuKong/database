<?php
/*
namespace MyApp;
class connectionPool {
	private static $instance = null;
	private $pool = [];
	private $maxConn;

	private function __construct($maxConn){
		$this->maxConn = $maxConn;
		for ($i = 0; $i <$maxConn; $i++) {
			$connectionString = ;
			$conn = pg_connect($connectionString);
			$this->pool[] = $conn;
		}
	}

	public static function getInstance($maxConn = 7) {
		if (self::$instance === null) {
			self::$instance = new self($maxConn);
		}
		return self::$instance;
	}

	public function getConn() {
		if (!empty($this->pool)) {
			return array_pop($this->pool);
		}
		return null;
	}

	public function releaseConn($conn){
		if($conn !== null) {
			$this->pool[] = $conn;
		}
	}
}
 */
?>
