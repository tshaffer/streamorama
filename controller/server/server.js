var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../client/')));

app.get('/addDecoder', function (req, res) {

    console.log("setEncoderParams invoked");
    res.set('Access-Control-Allow-Origin', '*');

    var paramsStr = req.query.decoderParams;
    var params = JSON.parse(paramsStr);
    var name = params.name;
    var serialNumber = params.serialNumber;

    res.send('ok');
});


app.get('/setEncoderParams', function(req, res) {

    console.log("setEncoderParams invoked");
    res.set('Access-Control-Allow-Origin', '*');

    var encoderParamsStr = req.query.encoderParams;
    var encoderParams = JSON.parse(encoderParamsStr);

    // read existing file
    // var str = fs.readFileSync("encoders.json", "ascii");
    // var encoders = JSON.parse(str);

    // add / overwrite record for encoder
    var key = encoderParams.serialNumber;
    brightSignEncoders[key] = encoderParams;

    // write updated file
    var encodersStr = JSON.stringify(brightSignEncoders, null, '\t');
    fs.writeFileSync("encoders.json", encodersStr);

    res.send("ok");
});

app.get('/getEncoderTargetStatus', function(req, res) {

    console.log("getEncoderTargetStatus invoked");
    res.set('Access-Control-Allow-Origin', '*');

    var serialNumber = req.query.serialNumber;
    console.log("serialNumber: ", serialNumber);

    var brightSignEncoder = brightSignEncoders[serialNumber];
    if (brightSignEncoder) {
        res.send(brightSignEncoder);
    }
    else {
        // no status on this encoder - let client know
        res.sendStatus(204);
    }
});

app.get('/startEncoder', function(req, res) {

    console.log("setEncoderStatus invoked");
    res.set('Access-Control-Allow-Origin', '*');

    var serialNumber = req.query.serialNumber;
    console.log("serialNumber: ", serialNumber);

    var encoderTargetStatus = {};
    encoderTargetStatus.encoding = true;
    brightSignEncoders[serialNumber] = encoderTargetStatus;

    res.send("ok");
});

app.get('/stopEncoder', function(req, res) {

    console.log("setEncoderStatus invoked");
    res.set('Access-Control-Allow-Origin', '*');

    var serialNumber = req.query.serialNumber;
    console.log("serialNumber: ", serialNumber);

    var encoderTargetStatus = {};
    encoderTargetStatus.encoding = false;
    brightSignEncoders[serialNumber] = encoderTargetStatus;

    res.send("ok");
});

function send200(response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('200: OK');
    response.end();
}

var brightSignEncoders = {};

console.log("launch streamorama server - listening on port 8080");

var str = fs.readFileSync("encoders.json", "ascii");
brightSignEncoders = JSON.parse(str);

var port = process.env.PORT || 8080;
app.listen(port);
