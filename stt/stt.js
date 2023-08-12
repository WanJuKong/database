const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.onresult = function(event) {
	const transcript = event.results[0][0].transcript;
	console.log('recognition: '+transcript);
	document.getElementById('recogResult').innerHTML += transcript + '<br>';
};

function recogStart(){
	recognition.start();
	console.log('Recognition started.')
}
