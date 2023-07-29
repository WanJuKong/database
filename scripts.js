const table = document.getElementById('table');

let checklist = [];

const input = {
	name : document.getElementById('name'),
	age : document.getElementById('age'),
	email : document.getElementById('email'),
	filled : function(){
		if(this.name.value === '' 
		|| this.age.value === ''
		|| this.email.value === ''){
			return false;
		}
		return true;
	},
	clear : function(){
		this.name.value = '';
		this.age.value = '';
		this.email.value = '';
	}
}

function submit_input() {
	if(!input.filled()){
		console.error('not filled');
		return -1;
	}
	const xhr = new XMLHttpRequest();
	const url = 'submit.php';
	const form = new FormData();
	form.append('name', input.name.value);
	form.append('age', input.age.value);
	form.append('email', input.email.value);
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

function refresh(){
	const xhr = new XMLHttpRequest();
	const url = 'get_all.php';
	xhr.open('POST', url, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			let response = xhr.responseText;
			let responseArr=JSON.parse(response);
			displayTable(table, responseArr);
			console.log('table refreshed.');
		}
	}
	xhr.send();
}

function displayTable(table, Arr){
table.innerHTML = 'refreshing...'
	HTMLstring = '';
	for(let row in Arr){
		HTMLstring += '<tr>';
		for(let element in Arr[row]){
			HTMLstring += '<td>' + Arr[row][element]; + '</td>';
		}
		HTMLstring += '<td>' + checkboxText(Arr[row]['id']) + '</td>';
		HTMLstring += '</tr>';
	}
	table.innerHTML = HTMLstring;
}

function checkboxText(id){
	let text = "<input type='checkbox' id='"
		+ id
		+ "' onchange='checkboxChanged(this.id, this.checked)'>";
	return text;
}

function checkboxChanged(id, checked){
	if(checked){
		checklist.push(id);
		console.log(id + "'th element checked.\nchecklist=" + checklist);
	} else {
		checklist=checklist.filter(item => item !== id);
		console.log(id + "'th element unchecked.\nchecklist=" + checklist);
	}
}

function deleteData(){
	if(checklist.length == 0){
		console.error('Element for delete not selected')
		return -1;
	}
	const form = new FormData();
	const xhr = new XMLHttpRequest();
	const url = 'delete.php';
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


refresh();
