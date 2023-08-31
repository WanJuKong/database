<?php
/*
$param = $_POST['text'];

$dir = '/var/myapp/pythonChatbot/intent/';
$venv_active = 'bin/activate';
$file = 'model_intent_test_php.py';

$result = shell_exec("source $dir$venv && python3 $dir$file $param 2>&1");

if ($result === null){
	echo 'Connection Error';
} else {
	echo $result;
}
 */

$param = $_POST['text'];

$venv_path = '/var/myapp/pythonChatbot/intent/bin/python3';
$script_path = '/var/myapp/pythonChatbot/intent/model_intent_test_php.py';

$result = shell_exec("$venv_path $script_path $param 2>&1");

if ($result === null) {
    echo 'Connection Error';
} else {
    echo $result;
}
?>
