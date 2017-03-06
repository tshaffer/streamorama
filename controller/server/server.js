var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/', express.static(path.join(__dirname, '../client/')));
// app.use('/', express.static(path.join(__dirname, './client/')));
app.use('/', express.static(path.join('/storage/sd/client/')));

app.get('/getEncoders', function(req, res) {
    console.log("getEncoders invoked");
    res.set('Access-Control-Allow-Origin', '*');
    res.send(brightSignEncoders);
});

app.get('/getDecoders', function(req, res) {
    console.log("getDecoders invoked");
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
    // fs.writeFileSync("decoders.json", decodersStr);
    fs.writeFileSync("storage/sd/decoders.json", decodersStr);

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
    // fs.writeFileSync("encoders.json", encodersStr);
    fs.writeFileSync("storage/sd/encoders.json", encodersStr);

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
              var encoderParams = {};
              encoderParams.stream = encoder.stream;
              encoderParams.index = encoder.index;
              encoderParams.numEncoders = Object.keys(brightSignEncoders).length;
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(encoderParams));
             return;
          }
      }
  }
  res.sendStatus(204);
});


app.get('/getEncoderStreamByIndex', function(req, res) {

  var responseSent = false;

  console.log("getEncoderStreamByIndex invoked");
  res.set('Access-Control-Allow-Origin', '*');

  var decoderSerialNumber = req.query.serialNumber;
  console.log("decoderSerialNumber: ", decoderSerialNumber);

  var encoderIndex = Number(req.query.encoderIndex);
  console.log("encoderIndex: ", encoderIndex);

  var decoder = brightSignDecoders[decoderSerialNumber];
  if (decoder) {

    // get encoder that has the specified index
    for (var serialNumber in brightSignEncoders) {
      if (brightSignEncoders.hasOwnProperty(serialNumber)) {
        var encoder = brightSignEncoders[serialNumber];
        if (encoder.index === encoderIndex) {

          decoder.assignedEncoder = encoder.serialNumber;

          var encoderParams = {};
          encoderParams.stream = encoder.stream;
          encoderParams.index = encoder.index;
          encoderParams.numEncoders = Object.keys(brightSignEncoders).length;
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(encoderParams));
          reponseSent = true;
          return;
        }
      }
    };
  }
  if (!responseSent) {
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


var brightSignEncoders = {};
var brightSignDecoders = {};

console.log("launch streamorama server - listening on port 8080");

// var encodersStr = fs.readFileSync("encoders.json", "ascii");
var encodersStr = fs.readFileSync("storage/sd/encoders.json", "ascii");
brightSignEncoders = JSON.parse(encodersStr);

// TODO - hack - assign an index to each encoder so that it appears like an ordered list
// TODO - long term, need a solution where the ordering matches up to what the user
// TODO - sees on the screen (or some other rational predictable algorithm
var encoderIndex = 0;
for (var serialNumber in brightSignEncoders) {
  if (brightSignEncoders.hasOwnProperty(serialNumber)) {
    var brightSignEncoder = brightSignEncoders[serialNumber];
    brightSignEncoder.index = encoderIndex++;
  }
};

// var decodersStr = fs.readFileSync("decoders.json", "ascii");
var decodersStr = fs.readFileSync("storage/sd/decoders.json", "ascii");
brightSignDecoders = JSON.parse(decodersStr);

var port = process.env.PORT || 8080;
app.listen(port);

