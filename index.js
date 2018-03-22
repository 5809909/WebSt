// function applyForVisa(documents, resolve, reject) {
// 	console.log('Обработка заявления');
// 	setTimeout(function () {
// 		Math.random() > .5 ? resolve({}) : reject('в визе отказано')
// 	}, 2000);
// }
//
// applyForVisa({}, function (visa) {
// 		console.info('Виза пполучена');
// 	}, function (reason) {
// 		console.error(reason);
//
// 	}
// )


// tozhe samoe tolko s promisami

function applyForVisa(documents) {
	console.log('Obrabotka zayavlenia...');
	let promise = new Promise(function (resolve, reject) {
		setTimeout(function () {
			Math.random() > .5 ? resolve({}) : reject('V Vize otkazano')

		}, 2000);
	});
	return promise;
}

// applyForVisa({})
// 	.then(function (visa) {
// 		console.info('Visa poluchena');
// 	},
// 		function (reason) {
// 		console.error(reason);
// 		});

applyForVisa({})
	.then(visa => console.info('Visa poluchena'),
		    reason => console.error(reason));


// var http = require("http");
//
// function onRequest(request, response) {
// 	console.log("Request received.");
// 	response.writeHead(200, {"Content-Type": "text/plain"});
// 	response.write("Hello World");
// 	response.end();
// }
//
// http.createServer(onRequest).listen(8888);
//
// console.log("Server has started.");