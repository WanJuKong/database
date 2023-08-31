const ELEMENTSINROW = 3;

const currency_type = '&#8361;' //(원: &#8361;) (달러: &#x0024;)

const descriptions = [];

const Dom = {
	sortList : document.getElementById('sortList'),

	table : document.getElementById('table'),

	totalPrice : document.getElementById('totalPrice'),

	orders : document.getElementById('orders'),

	chatbot : document.getElementById('chatbot-area-test')
};

let sortListArr;

const Order = {
	orders : {},

	totalPrice : 0,

	totalOrder : 0,

	isin : function(id) {
		if(this.orders[id]) {
			return true;
		}
		return false;
	},

	setTotalPrice : function() {
		this.totalPrice = 0;
		for(let id in this.orders) {
			let order = this.orders[id];
			this.totalPrice += (order.price) * (order.number);
		}
		Dom.totalPrice.innerHTML = "Total Price: " + currency_type + this.totalPrice;
	},

	displayOrders : function(){
		let htmlText = '';
		for(let id in this.orders) {
			let order = this.orders[id]
			htmlText += `<tr id='tr${id}'><td>${order.name}</td><td>${order.price}</td><td><input class='inRow' type='number' min='1' max='10' step='1' value='${order.number}' onchange=Order.numberChanged(${id},this.value)></td><td><button onclick='Order.cancel(${id})'>Delete</button></td></tr>`;
		}
		Dom.orders.innerHTML = htmlText;
	},

	numberChanged : function(id, value) {
		this.totalOrder += (value - this.orders[id].number);
		this.orders[id].number = value;
		this.setTotalPrice();
		this.changeColor(id);
	},

	changeColor : function(id) {
		let tr = document.getElementById('tr' + id);
		tr.scrollIntoView({
			behavior: 'smooth'
		});
		tr.style.color = '#f80';
		tr.style.textShadow = '0 0 10px #ff8, 0 0 20px #ff8, 0 0 30px #ff8, 0 0 40px #ff8 ';
		setTimeout(function() {
			tr.style.color = 'black';
			tr.style.textShadow = 'none';
		}, 500);
	},

	cancel : function(id) {
		if(id === 'all'){
			this.orders = {};
		}
		else {
			delete this.orders[id];
		}
		this.displayOrders()
		this.setTotalPrice();
	},

	submitOrder : function() {
		if(Object.keys(this.orders).length === 0) {
			alert('You have to select at least one menu to submit your orders.');
			return -1;
		}
		if(1) {
			alert('Successfully Submitted!');
			this.cancel('all');
			return 0;
		}
		callManager();
		alert('ERROR! failed to submit');
		return -1;
	}
};
function callManager(){
	return 0;
}

function get(option, table, callback, asynchronous = true) {
	const xhr = new XMLHttpRequest();
	const form = new FormData();
	const url = "./php/get_all.php";
	if (option !== 'all') {
		form.append('option', option);
	}
	form.append('table', table);
	xhr.open('POST', url, asynchronous);
	xhr.onreadystatechange = function() {
		if(xhr.readyState ===4 && xhr.status === 200) {
			let response = xhr.responseText;
			callback(response);
		}
	}
	xhr.send(form);
}


function fillSortList() {
	get('all', 'type', function(response) {
		sortListArr = JSON.parse(response);
		refresh();
		Dom.sortList.innerHTML = getSortListText(sortListArr);
	});
}


function getSortListText(Arr) {
	let htmlText = '';
	for (let row in Arr) {
		for (let element in Arr[row]) {
			let data = Arr[row][element];
			htmlText += `<li><a href='#${data}'>${data}</a></li>`;
		}
	}
	return htmlText;
}

function renderTable(Arr, type) {
	const length = Object.keys(Arr).length;
	let htmlText = `<tr id='${type}'><td class='sort_br' colspan='${ELEMENTSINROW}'>${type}</td></tr><tr>`
	for(let i = 0; i < length; i++) {
		let imgHTML = "";
		let infoHTML = "";
		const menuInfo = Arr[i];
		let imgSorce = menuInfo['img_src'];
		imgHTML += `<td class='container'><button onclick='addOrder("${menuInfo.id}","${menuInfo.name}","${menuInfo.price}")'><div class='img_container'><img src='./php/get_image.php?img_src=${imgSorce}&extension=${imgSorce.slice(imgSorce.lastIndexOf('.')+1)}' width='300' height='300' alt='${menuInfo.name}'></div></button>`;
		infoHTML += `<div class='overlay'><ul class='info-text'><li><span class='name'>${menuInfo.name}</span>\n<sub class='price'> ${currency_type}${menuInfo.price}</sub></li><hr>\n<li class='description'>${menuInfo.description}</li></ul></div></td>`;
		htmlText += imgHTML + infoHTML;
		if ((i + 1) % ELEMENTSINROW === 0) {
			htmlText += "</tr>\n<tr>";
		}
	}
	Dom.table.innerHTML += htmlText + "</tr>";
}

function addOrder(id, name, price){
	if(Order.isin(id)) {
		Order.orders[id]['number'] ++;
	}
	else {
		Order.orders[id] = { 'name' : name, 'price' : extractNumbers(price), 'number' : 1 };
	}
	Order.totalOrder ++;
	Order.setTotalPrice();
	Order.displayOrders();
	Order.changeColor(id);
}

function extractNumbers(str) {
	return Number(str.replace(/\D/g, ''));
}

function refresh() {
	Order.setTotalPrice();
	Dom.table.innerHTML = '';
	for(let index in sortListArr){
		let type = sortListArr[index]['type'];
		get(type,'info', function(response) {
			responseArr = JSON.parse(response);
			renderTable(responseArr, type);
		}, false);
	}
}

function chatbot_send(){
	const xhr = new XMLHttpRequest();
	const form = new FormData();
	const url = "./php/chatbot.php";
	form.append('option', Dom.chatbot.value);
	Dom.chatbot.value = '';
	xhr.open('POST', url, true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {
			let response = xhr.responseText;
			console.log(response);
		}
	}
	xhr.send(form);
}

fillSortList();
