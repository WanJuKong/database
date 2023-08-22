const leastAccuracy = 0.1;
const fix = 10;	
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-Us';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


recognition.onresult = function(event) {
	const transcript = event.results[0][0].transcript;
	const confidence = parseFloat(event.results[0][0].confidence);
	if (confidence < leastAccuracy) {
		console.warn('Error: unrecognizable');
		return -1;
	}
	console.log(`Result: ${transcript} / ${confidence.toFixed(fix) * 100}%`);
	document.getElementById('recogResult').innerHTML += transcript + '<br>';
	let scrollTo = document.getElementById('recogScroll');
	scrollTo.scrollIntoView({
		behavior: 'smooth'
	});
/*
	for(let i = 0; i < event.results.length; i++) {
		for(let j = 0; j < event.results[i].length; j++) {
			let transcript = event.results[i][j].transcript;
			let confidence = parseFloat(event.results[i][j].confidence);
			console.log(`Result: ${transcript} / [${i}][${j}]${confidence.toFixed(fix) * 100}%`);
			document.getElementById('recogResult').innerHTML += transcript + '<br>';
		}
	}
	document.getElementById('recogResult').innerHTML += '<br>';
*/
};

function recogStart(){
	recognition.start();
	console.log('Recognition started.')
}
