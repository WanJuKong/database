const ELEMENTSINROW = 3;

const sortList = document.getElementById('sortList');

const descriptions = [];

//const imgFilesLocation = ""

function get(option, table, callback/*, img_get = false*/) {
	const xhr = new XMLHttpRequest();
	const form = new FormData();
	let url = "./php/get_all.php";
	if (option !== 'all') {
		url = "./php/get_some.php";
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
		let responseArr = JSON.parse(response);
		console.log(responseArr);  // 디버깅 ========================
		sortList.innerHTML = getSortListText(responseArr);
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
function renderTable(Arr) {
	const length = Object.keys(Arr).length;
	const table = document.getElementById('table');
	let htmlText = "<tr>"
	for(let i = 0; i < length; i++) {
		let imgHTML = "";
		let infoHTML = "";
		const menuInfo = Arr[i];

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
		let imgSorce = menuInfo['img_src'];
		imgHTML += `<td><img src='./php/get_image.php?img_src=${imgSorce}&extension=${imgSorce.slice(imgSorce.lastIndexOf('.')+1)}' width='200' height='200' alt='${menuInfo['name']}'></td>`;
		//imgHTML += `<td><img src='data:image;base64,${menuInfo['img_src']}' width='200' height='200' alt='${menuInfo['name']}'></td>`;
		infoHTML += `<td><ul><li>${menuInfo['name']}</li>\n<li>${menuInfo['price']}</li>\n`;
		if (menuInfo['description'] !== '') {
			infoHTML += `<li><div id='desc${menuInfo['id']}' class='descriptions' onclick="showDescriptions('${menuInfo['id']}')">description</div></li>`;
			descriptions[menuInfo['id']] = menuInfo['description'];
		}
		infoHTML += "</ul></td>";
		//주문버튼 추가
		htmlText += imgHTML + infoHTML;
		if ((i + 1) % ELEMENTSINROW === 0) {
			htmlText += "</tr>\n<tr>";
		}
		//=================================
	}
	console.log(htmlText);
	table.innerHTML = htmlText + "</tr>";
}

function showDescriptions(id){
	let desc = document.getElementById('desc' + id);
	if (desc.innerHTML === 'description'){
		desc.innerHTML = descriptions[id];
	} else {
		desc.innerHTML = 'description';
	}
}

function refresh() {
	get('all','info', function(response) {
		responseArr = JSON.parse(response);
		console.log(responseArr);   // 디버깅 ==========================
		renderTable(responseArr);
	}/*, true*/);
}

fillSortList();
refresh();


/*
<a> -> onclick refresh (sort);

*/
