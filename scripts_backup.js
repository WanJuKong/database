const table = document.getElementById('table');
const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
let typelist = [];

let checklist = [];

class Input {
	constructor(id){
		this.id = id;
		this.name = document.getElementById(id + "name");
		this.price = document.getElementById(id + "price");
		this.type = document.getElementById(id + "type");
		this.description = document.getElementById(id + "description");
		this.img_src = document.getElementById(id + "img_src");
		try {
			this.img_src.onchange = function(event) {
				const file = event.target.files[0];
				if(file && !allowedFileTypes.includes(file.type)){
					console.warn("Invalid file type.\n allowed: "+ allowedFileTypes);
					alert("Invalid file type.\n allowed: "+ allowedFileTypes);
					event.target.value = '';
				}
			}
		} catch (error){}
	}
	isFilled(){
		if(this.name.value === ''
		|| this.price.value === ''
		|| this.type.value === ''){
			return false;
		}
		return true;
	}
	clear(){
		this.name.value = '';
		this.price.value = '';
		this.type.value = typelist[0];
		this.description.value = '';
		this.img_src.value = '';
	}
}
/*
const input = {
	name : document.getElementById('name'),
	price : document.getElementById('price'),
	type : document.getElementById('type'),
	description : document.getElementById('description'),
	isFilled : function(){
		if(this.name.value === '' 
		|| this.price.value === ''
		|| this.type.value === ''){
			return false;
		}
		return true;
	},
	clear : function(){
		this.name.value = '';
		this.price.value = '';
		this.type.value = '';
		this.description.value = '';
	}
}
*/

function typeListSet(){
	get_all('type', function(response) {
		let responseArr = JSON.parse(response);
		typelist = [];
		for(let row of responseArr) {
			typelist.push(row['type']);
			typeSet('type');
		}
	});
}

function typeSet(id, selected = undefined){
	let htmlText = "";
	for (let index in typelist){
		let type=typelist[index];
		htmlText += "<option value='" + type
			+ (selected === type ? "' selected>" : "'>")
			+ type + "</select>";
	}
	document.getElementById(id).innerHTML= htmlText;
}

function submit_input() {
	const input = new Input('');
	if(!input.isFilled()){
		console.warn('not filled');
		return -1;
	}
	const xhr = new XMLHttpRequest();
	const url = './php/submit.php';
	const form = new FormData();
	form.append('table', 'info');
	form.append('name', input.name.value);
	form.append('price', input.price.value);
	form.append('type', input.type.value);
	form.append('description', input.description.value);
	form.append('img', input.img_src.files[0]);
	input.clear();
	xhr.open ('POST', url, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			var response = xhr.responseText;
			console.log(response);
			refresh();
		}
	}
	xhr.send(form);
};

function get_all(table = 'info', callback){
	const xhr = new XMLHttpRequest();
	const url = './php/get_all.php';
	const form = new FormData();
	form.append('table', table);
	xhr.open('POST', url, false);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			checklist=[];
			let response = xhr.responseText;
			callback(response);
		}
	}
	xhr.send(form);
}

function refresh(){
	typeListSet();
	rearrange(function(){
		get_all('info', function(response){
			let responseArr = JSON.parse(response);
			displayTable(table, responseArr);
			console.log('table refreshed.');
		});
	});
}
function displayTable(table, Arr){
	table.innerHTML = 'refreshing...'
	HTMLstring = '';
	for(let row in Arr){
		HTMLstring += "<tr>";
		for(let element in Arr[row]){
			HTMLstring += `<td class='${element}' id='${Arr[row]['id'] + element}'>${Arr[row][element]}</td>`;
		}
		HTMLstring += `<td class='etc'>${htmlOptionText(Arr[row]['id'])}</td></tr>`;
	}
	table.innerHTML = HTMLstring;
}

function htmlOptionText(id){
	let button_text = `<button type='button' id='b${id}' onclick='buttonClicked(this.id, this.innerHTML)'>change</button>`;
	let checkbox_text = `<input type='checkbox' id='c${id}' onchange='checkboxChanged(this.id, this.checked)'>`;
	return button_text + checkbox_text;
}

function buttonClicked(id, state){
	const button = document.getElementById(id);
	id = id.slice(1);
	if(state === "change"){
		console.log("updating element: " + id)
		const input = new Input(id);
		input.name.innerHTML = `<input id='i${id}name' value='${input.name.innerHTML}'>`;
		input.price.innerHTML = `<input id='i${id}price' value='${input.price.innerHTML}'>`;
		let selected = input.type.innerHTML;
		input.type.innerHTML = `<select id='i${id}type'></select>`;
		typeSet(`i${id}type`, selected);
		input.description.innerHTML = `<textarea rows='1' cols='50' id='i${id}description'>${input.description.innerHTML}</textarea>`;
		input.img_src.innerHTML = `<input type='file' id='i${id}img_src'>`;
		button.innerHTML = "update";
	} else {
		const input = new Input('i' + id);
		if(!input.isFilled()){
			console.warn("not filled");
			return -1;
		}
		update_input(id, input);
	}
}

function checkboxChanged(id, checked){
	id = id.slice(1);
	if(checked){
		checklist.push(id);
		checklist.sort((a, b) => a - b);
		console.log(id + `'th element checked.\nchecklist: [ ${checklist} ]`);
	} else {
		checklist=checklist.filter(item => item !== id);
		console.log(id + `'th element unchecked.\nchecklist: [" ${checklist} ]`);
	}
}

function update_input(id, input){
	const form = new FormData();
	const xhr = new XMLHttpRequest();
	const url = './php/update.php';
	form.append('id', id);
	form.append('name', input.name.value);
	form.append('price', input.price.value);
	form.append('type', input.type.value);
	form.append('description', input.description.value);
	form.append('img', input.img_src.files[0]);
	xhr.open('POST', url, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			let response = xhr.responseText;
			console.log(response);
			refresh();
		}
	}
	xhr.send(form);
}

function deleteData(){
	if(checklist.length === 0){
		console.warn('Element for delete not selected');
		return -1;
	}
	if(!confirm('Are you sure you want to delete this element?\n' + checklist)){
		console.warn('Delete canseled');
		return -1;
	}
	const form = new FormData();
	const xhr = new XMLHttpRequest();
	const url = './php/delete.php';
	form.append('id', checklist);
	checklist = [];
	xhr.open('POST', url, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			let response = xhr.responseText;
			console.log(response);
			refresh();
		}
	}
	xhr.send(form);
}

function rearrange(callback){
	const xhr = new XMLHttpRequest();
	const url = './php/rearrange.php';
	xhr.open('POST', url, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState ===4 && xhr.status === 200){
			let response = xhr.responseText;
			console.log(response);
			callback();
		}
	}
	xhr.send();
}

refresh();
