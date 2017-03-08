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

function addDecoder(decoder) {

  console.log('addDecoder');
  console.log('serial number: ', decoder.serialNumber);
  console.log('name: ', decoder.name);

  // default assigned stream to 'first' stream in list
  for (var streamUniqueId in brightSignStreams) {
    if (brightSignStreams.hasOwnProperty(streamUniqueId)) {
      var stream = brightSignStreams[streamUniqueId];
      decoder.assignedStream = stream.name;
      break;
    }
  };

  // add / overwrite record for decoder
  var key = decoder.serialNumber;
  brightSignDecoders[key] = decoder;

  // write updated file
  var decodersStr = JSON.stringify(brightSignDecoders, null, '\t');
  // fs.writeFileSync("decoders.json", decodersStr);
  fs.writeFileSync("storage/sd/decoders.json", decodersStr);

  return decoder;
}

app.get('/getStreams', function(req, res) {
    console.log("getStreams invoked");
    res.set('Access-Control-Allow-Origin', '*');
    res.send(brightSignStreams);
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

app.get('/addStream', function(req, res) {

    console.log("addStream invoked");
    res.set('Access-Control-Allow-Origin', '*');

    var streamParamsStr = req.query.streamParams;
    var streamParams = JSON.parse(streamParamsStr);

    // set the index to the stream count
    streamParams.index = Object.keys(brightSignStreams).length;

    // add / overwrite record for stream
    var key = streamParams.name;
    brightSignStreams[key] = streamParams;

    // write updated file
    var streamsStr = JSON.stringify(brightSignStreams, null, '\t');
    // fs.writeFileSync("streams.json", streamsStr);
    fs.writeFileSync("storage/sd/streams.json", streamsStr);

    res.send("ok");
});

app.get('/getStreamAddress', function(req, res) {

  console.log("getStreamAddress invoked");
  res.set('Access-Control-Allow-Origin', '*');

  var decoderSerialNumber = req.query.serialNumber;
  console.log("decoderSerialNumber: " + decoderSerialNumber);

  var decoder = brightSignDecoders[decoderSerialNumber];

  if (!decoder) {
    // TODO - need a real name for the decoder
    var decoder = { serialNumber: req.query.serialNumber, name: req.query.serialNumber };
    decoder = addDecoder(decoder);
  }

  var streamUniqueId = decoder.assignedStream;
  if (streamUniqueId && streamUniqueId !== '') {
      var stream = brightSignStreams[streamUniqueId];
      if (stream) {
          var streamParams = {};
          streamParams.stream = stream.stream;
          streamParams.index = stream.index;
          streamParams.numStreams = Object.keys(brightSignStreams).length;
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(streamParams));
         return;
      }
  }

  res.sendStatus(204);
});


app.get('/getStreamAddressByIndex', function(req, res) {

  var responseSent = false;

  console.log("getStreamAddressByIndex invoked");
  res.set('Access-Control-Allow-Origin', '*');

  var decoderSerialNumber = req.query.serialNumber;
  console.log("decoderSerialNumber: " + decoderSerialNumber);

  var streamIndex = Number(req.query.streamIndex);
  console.log("streamIndex: " + streamIndex);

  var decoder = brightSignDecoders[decoderSerialNumber];
  if (decoder) {

    console.log('decoderFound');
    console.log(decoder);

    // get stream that has the specified index
    for (var serialNumber in brightSignStreams) {
      if (brightSignStreams.hasOwnProperty(serialNumber)) {
        var stream = brightSignStreams[serialNumber];
        if (stream.index === streamIndex) {

          decoder.assignedStream = stream.name;

          var streamParams = {};
          streamParams.stream = stream.stream;
          streamParams.index = stream.index;
          streamParams.numStreams = Object.keys(brightSignStreams).length;
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(streamParams));
          reponseSent = true;
          return;
        }
      }
    };
  }
  else {
    console.log('decoderNotFound');
    console.log(decoderSerialNumber);
    console.log(brightSignDecoders);
  }
  if (!responseSent) {
    res.sendStatus(204);
  }
});


var brightSignStreams = {};
var brightSignDecoders = {};

console.log("launch streamorama server - listening on port 8080");

// var streamsStr = fs.readFileSync("streams.json", "ascii");
var streamsStr = '';
try {
  streamsStr = fs.readFileSync("storage/sd/streams.json", "ascii");
  brightSignStreams = JSON.parse(streamsStr);
} catch(e) {
  console.log('error opening streams.json', e);
}

// TODO - hack - assign an index to each stream so that it appears like an ordered list
// TODO - long term, need a solution where the ordering matches up to what the user
// TODO - sees on the screen (or some other rational predictable algorithm
var streamIndex = 0;
for (var serialNumber in brightSignStreams) {
  if (brightSignStreams.hasOwnProperty(serialNumber)) {
    var brightSignStream = brightSignStreams[serialNumber];
    brightSignStream.index = streamIndex++;
  }
};

// var decodersStr = fs.readFileSync("decoders.json", "ascii");
var decodersStr = '';
try {
  decodersStr = fs.readFileSync("storage/sd/decoders.json", "ascii");
  brightSignDecoders = JSON.parse(decodersStr);
} catch(e) {
  console.log('error opening decoders.json', e);
}

var port = process.env.PORT || 8080;
app.listen(port);

