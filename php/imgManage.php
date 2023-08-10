<?php

if 
	if (isset($_FILES['img']) {
		$file = $_FILES['img'];
		$dir = "/var/myapp/uploads/";
		$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
		$extensionAllowed = array('jpg', 'jpeg', 'png');

		if(!in_array($extension, $extensionAllowed)){
			echo "Error: Invalid image extension.\n";
		} else {
			$img_src = $dir . date("Y_m_d_h_i_s_") . basename($file['name'];
			if (move_:wq


