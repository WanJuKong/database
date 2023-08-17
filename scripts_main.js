const ELEMENTSINROW = 3;

const currency_type = '&#8361;' //(원: &#8361;) (달러: &#x0024;)

const sortList = document.getElementById('sortList');

const descriptions = [];

const table = document.getElementById('table');

let sortListArr;

//const imgFilesLocation = ""

const Order = {
	orders : [],

	totalPrice : 0,

	totalOrder : 0,

	add : function(id) {
	},

	remove : function(id) {
	},
};

function get(option, table, callback/*, img_get = false*/) {
	const xhr = new XMLHttpRequest();
	const form = new FormData();
	const url = "./php/get_all.php";
	if (option !== 'all') {
		form.append('option', option);
	}
//	form.append('img_get', img_get); ===============================
	form.append('table', table);
	xhr.open('POST', url, true);
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
		console.log(sortListArr);  // 디버깅 ========================
		refresh();
		sortList.innerHTML = getSortListText(sortListArr);
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
/*
const exampleArr = {
	0 : {
		id : '1',
		name : 'kimchi fried rice',
		price : '10000',
		type : 'rice',
		discription : 'fired rice with kimchi in it.',
		img_src : '000001.jpg',
		regtime : ''
	},
	1 : {
		id : '2',
		name : 'cider',
		price : '2000',
		type : 'drink',
		description : '',
		img_src : '000002.jpg',
		regtime : ''
	},
	2 : {
		id : '3',
		name : 'null',
		price : '0',
		type : 'none',
		description : 'null data',
		img_src : '',
		regtime : ''
	}
};
*/    //디버깅  ===================================
function renderTable(Arr, type) {
	const length = Object.keys(Arr).length;
	let htmlText = `<tr id='${type}'><td class='sort_br' colspan='${ELEMENTSINROW}'>${type}</td></tr><tr>`
	for(let i = 0; i < length; i++) {
		let imgHTML = "";
		let infoHTML = "";
		const menuInfo = Arr[i];

		// 테이블 ver 1
/*		imgHTML += "<td><img src='"
			+ imgFilesLocation + "imgNotFound.jpg"
			//+ imgFilesLocation + (menuInfo['img_src'] === '' ? "imgNotFound.jpg" : menuInfo['img_src'])
			+ "' width='200' height='200' alt='"
			+ menuInfo['name']
			+ "'></td>";
		infoHTML += "<td><ul><li>"
			+ menuInfo['name'] + "</li>\n<li>"
			+ menuInfo['price'] + "</li>\n";
		if (menuInfo['description'] !== ''){
			infoHTML += "<li><div id='desc" + menuInfo['id'] + "'></div>"
				+ "<div class='descriptions' onclick=\"showDescriptions('"
				+ menuInfo['id'] + "')\">description</div></li>";
			descriptions[menuInfo['id']] = menuInfo['description'];
		}
		infoHTML += "</ul></td>";
		//주문버튼 추가
		htmlText += imgHTML+infoHTML;
		if ((i + 1) % ELEMENTSINROW === 0) {
			htmlText += "</tr>\n<tr>";
		}
		*/
		//=================================


		//테이블 ver 2
/*
		let imgSorce = menuInfo['img_src'];
		imgHTML += `<td><img src='./php/get_image.php?img_src=${imgSorce}&extension=${imgSorce.slice(imgSorce.lastIndexOf('.')+1)}' width='200' height='200' alt='${menuInfo['name']}'></td>`;
		//imgHTML += `<td><img src='data:image;base64,${menuInfo['img_src']}' width='200' height='200' alt='${menuInfo['name']}'></td>`;
		infoHTML += `<td><ul><li class='name'>${menuInfo['name']}</li>\n<li class='price'>${menuInfo['price']}</li>\n`;
		if (menuInfo['description'] !== '') {
			infoHTML += `<li>[ <a id='desc${menuInfo['id']}' class='description' onclick="showDescriptions('${menuInfo['id']}')">description</a> ]</li>`;
			descriptions[menuInfo['id']] = menuInfo['description'];
		}
		infoHTML += "</ul></td>";
		//주문버튼 추가
		htmlText += imgHTML + infoHTML;
		if ((i + 1) % ELEMENTSINROW === 0) {
			htmlText += "</tr>\n<tr>";
		}*/
		//=================================


		//테이블 ver 3
		let imgSorce = menuInfo['img_src'];
		imgHTML += `<td class='container'><button onclick='addOrder("${menuInfo.id}","${menuInfo.name}","${menuInfo.price}")'><div class='img_container'><img src='./php/get_image.php?img_src=${imgSorce}&extension=${imgSorce.slice(imgSorce.lastIndexOf('.')+1)}' width='300' height='300' alt='${menuInfo.name}'></div></button>`;
		infoHTML += `<div class='overlay'><ul class='info-text'><li><span class='name'>${menuInfo.name}</span>\n<sub class='price'> ${currency_type}${menuInfo.price}</sub></li><hr>\n<li class='description'>${menuInfo.description}</li></ul></div></td>`;
		htmlText += imgHTML + infoHTML;
		if ((i + 1) % ELEMENTSINROW === 0) {
			htmlText += "</tr>\n<tr>";
		}
	}
	console.log(htmlText);
	table.innerHTML += htmlText + "</tr>";
}

function addOrder(id, name, price){
	Order.isin();
	Order.orders[id] = {name, price, count}
	Order.totalOrder += 1;
	Order.totalPrice += price2int(price);
	Order.displayOrders();
}

function price2int(string){
}


/*
function showDescriptions(id){
	let desc = document.getElementById('desc' + id);
	if (desc.innerHTML === 'description'){
		desc.innerHTML = descriptions[id];
	} else {
		desc.innerHTML = 'description';
	}
}
*/

function refresh() {
	table.innerHTML = '';
	for(let index in sortListArr){
		let type = sortListArr[index]['type'];
		get(type,'info', function(response) {
			responseArr = JSON.parse(response);
			Order.menuInfo = responseArr;
			console.log(responseArr);   // 디버깅 ==========================
			renderTable(responseArr, type);
		}/*, true*/);
	}
}

fillSortList();



/*
<a> -> onclick refresh (sort);

*/
