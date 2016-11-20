var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("launch streamorama server app");

app.use('/', express.static(path.join(__dirname, '../streamingController/')));

app.get('/setEncoderParams', function(req, res) {

    console.log("setEncoderParams invoked");
    res.set('Access-Control-Allow-Origin', '*');

    // check what's in req.query
    // var name = req.query.name;
    //
    // var promise = dbController.getBSNPresentation(name);
    // promise.then(function(bsnPresentation) {
    //     var response = {};
    //     response.bsnPresentation = bsnPresentation;
    //     res.send(response);
    // }, function(err) {
    //     res.send("fail");
    // });

    // console.log(encoderParams);

    // read existing file
    var str = fs.readFileSync("encoders.json", "ascii");
    var encoders = JSON.parse(str);

    // add / overwrite record for encoder
    var key = encoderParams.serialNumber;
    encoders[key] = encoderParams;

    // write updated file
    var encodersStr = JSON.stringify(encoders, null, '\t');
    fs.writeFileSync("encoders.json", encodersStr);

});


function send200(response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('200: OK');
    response.end();
}

// var server = http.createServer(function (request, response) {
//
//     console.log("server callback invoked");
//
//     var responseData = {};
//     responseData.serverResponse = response;
//
//     var filePath = false;
//
//     parsedUrl = url.parse(request.url, true);
//
//     console.log("request url");
//     console.log(request.url);
//     console.log("parsed url pathname");
//     console.log(parsedUrl.pathname);
//     console.log("parsed url query");
//     console.log(parsedUrl.query);
//
//     send200(response);
// });
//
// server.listen(8080, function () {
//     console.log("Server listening on port 8080.");
// });
//

console.log("streamorama server listening on port 8080");

var port = process.env.PORT || 8080;
app.listen(port);
