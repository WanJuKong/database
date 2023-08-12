const speech = window.speechSynthesis || window.webkitSpeechSynthesis;
const utter = new SpeechSynthesisUtterance();
const voiceSelect = document.getElementById('voiceSelect');
const text2speech = document.getElementById('text2speech');
let voiceList = [];

speech.onvoiceschanged = function() {
	voiceList = speechSynthesis.getVoices();
	fillSelections(voiceList);
}

utter.rate = 1;
utter.volume = 1;
utter.lang = 'ko-KR';

function fillSelections(){
	let htmlText = '';
	for(let voice of voiceList){
		htmlText += `<option value='${voice.name}'>${voice.name}</option>`;
	}
	voiceSelect.innerHTML = htmlText;
}

function tts(){
	utter.voice = voiceList.find(voice => voice.name === voiceSelect.value);
	utter.text = text2speech.value;
	speech.speak(utter);
}
if (speechSynthesis.onvoicescanged !== undefined){
	speechSynthesis.onvoicechanged();
}

