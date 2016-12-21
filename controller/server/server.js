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

app.get('/getEncoders', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(brightSignEncoders);
});

app.get('/getDecoders', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(brightSignDecoders);
});

app.get('/setDecoder', function (req, res) {

    console.log("setDecoder invoked");
    res.set('Access-Control-Allow-Origin', '*');

    var decoderParamsStr = req.query.decoderParams;
    var decoderParams = JSON.parse(decoderParamsStr);

    // add / overwrite record for decoder
    var key = decoderParams.serialNumber;
    brightSignDecoders[key] = decoderParams;

    // write updated file
    var decodersStr = JSON.stringify(brightSignDecoders, null, '\t');
    fs.writeFileSync("decoders.json", decodersStr);

    res.send('ok');
});


app.get('/setEncoderParams', function(req, res) {

    console.log("setEncoderParams invoked");
    res.set('Access-Control-Allow-Origin', '*');

    var encoderParamsStr = req.query.encoderParams;
    var encoderParams = JSON.parse(encoderParamsStr);

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

app.get('/getDecoderTargetStatus', function(req, res) {

    console.log("getDecoderTargetStatus invoked");
    res.set('Access-Control-Allow-Origin', '*');

    var serialNumber = req.query.serialNumber;
    console.log("serialNumber: ", serialNumber);

    var brightSignDecoder = brightSignDecoders[serialNumber];
    if (brightSignDecoder) {
        res.send(brightSignDecoder);
    }
    else {
        // no status on this encoder - let client know
        res.sendStatus(204);
    }
});

app.get('/getEncoderStream', function(req, res) {

  console.log("getEncoderStream invoked");
  res.set('Access-Control-Allow-Origin', '*');

  var decoderSerialNumber = req.query.serialNumber;
  console.log("decoderSerialNumber: ", decoderSerialNumber);

  var decoder = brightSignDecoders[decoderSerialNumber];
  if (decoder) {
      var encoderSerialNumber = decoder.assignedEncoder;
      if (encoderSerialNumber && encoderSerialNumber !== '') {
          var encoder = brightSignEncoders[encoderSerialNumber];
          if (encoder) {
              res.send(encoder.stream);
              return;
          }
      }
  }
  res.sendStatus(204);
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


var brightSignEncoders = {};
var brightSignDecoders = {};

console.log("launch streamorama server - listening on port 8080");

var encodersStr = fs.readFileSync("encoders.json", "ascii");
brightSignEncoders = JSON.parse(encodersStr);

var decodersStr = fs.readFileSync("decoders.json", "ascii");
brightSignDecoders = JSON.parse(decodersStr);

var port = process.env.PORT || 8080;
app.listen(port);
