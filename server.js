var http = require('http'),
		PORT = 8080,
		fs = require('fs'),
		mysql = require('mysql'),
    Static = require('node-static'),
    fileServer = new Static.Server('.');


var client = mysql.createConnection({
	'user': 'root',
	'password': '',
	'host': 'localhost',
	'database': 'new_database_forUsers'
});

client.query('SELECT * FROM USERS');

var server = http.createServer(function (req, res) {
		fs.readFile('index.html', function(err, data) {
			if(err) {
				throw err;
			}
  	res.writeHead(200, {
			'Content-type': 'text.html',
			'Content-length': data.length
		});
		res.write(data);
		res.end();

		})
}).listen(PORT);

console.log("Сервер на портe " + PORT);