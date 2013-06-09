var fs = require('fs'),
    union = require('union'),
	director = require('director'),
	favicon = require('./middleware/favicon');

var router = exports.router = new director.http.Router();


	
router.post('/', { stream: true }, function () {
	var req = this.req,
		res = this.res,
		writeStream;
      
	writeStream = fs.createWriteStream('./bin/Files/' + Date.now() + '.txt');
	req.pipe(writeStream);

	writeStream.on('close', function () {
		fs.readFile('./index.html', function (err1, html) {
			if (err1) {
				fs.readFile('./public/index.html', function (err2, html) {
					if(err2)
					{	res.writeHead(404, {"Content-Type": "text/plain"});
						res.write("404 Not found");
						res.end();
					}
					else{
						res.writeHead(200, {"Content-Type": "text/html"});
						res.write('Wrote to a stream!(you may try again)');
						res.write(html);
						res.end();
					}
				});
			}
			else
			{	res.writeHead(200, {"Content-Type": "text/html"});  
				res.write('Wrote to a stream!(you may try again)');
				res.write(html);  
				res.end();
			}
		});
	});
});

exports.dispatch = function(req, res) {
	return router.dispatch(req, res);
}
