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

app.use('/', express.static(path.join(__dirname, '../client/')));

app.get('/setEncoderParams', function(req, res) {

    console.log("setEncoderParams invoked");
    res.set('Access-Control-Allow-Origin', '*');

    // var encoderParams = req.query;
    // console.log(encoderParams);
    var encoderParamsStr = req.query.encoderParams;
    var encoderParams = JSON.parse(encoderParamsStr);

    // read existing file
    var str = fs.readFileSync("encoders.json", "ascii");
    var encoders = JSON.parse(str);

    // add / overwrite record for encoder
    var key = encoderParams.serialNumber;
    encoders[key] = encoderParams;

    // write updated file
    var encodersStr = JSON.stringify(encoders, null, '\t');
    fs.writeFileSync("encoders.json", encodersStr);

    res.send("ok");
});


function send200(response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('200: OK');
    response.end();
}

console.log("streamorama server listening on port 8080");

var port = process.env.PORT || 8080;
app.listen(port);
