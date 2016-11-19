var http = require('http');
var url = require('url');


function setEncoderParams(encoderParams) {
    console.log("setEncoderParams invoked");
    console.log(encoderParams);


}

function send200(response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('200: OK');
    response.end();
}

var server = http.createServer(function (request, response) {

    var responseData = {};
    responseData.serverResponse = response;

    var filePath = false;

    parsedUrl = url.parse(request.url, true);

    // console.log("request url");
    // console.log(request.url);
    console.log("parsed url pathname");
    console.log(parsedUrl.pathname);
    // console.log("parsed url query");
    // console.log(parsedUrl.query);

    if (parsedUrl.pathname === '/setEncoderParams' || request.url === '/') {
        setEncoderParams(parsedUrl.query);
    }
    send200(response);

    // else if (request.url == '/') {                                      // default to index.html
    //     filePath = 'public/index.html';
    // } else {                                                            // serve static file
    //     parsedUrl = url.parse(request.url);
    //     filePath = "public" + parsedUrl.pathname;
    // }
    // var absPath = './' + filePath;
    // console.log("absPath = " + absPath);
    // serveStatic(response, cache, absPath);
});

server.listen(8080, function () {
    console.log("Server listening on port 8080.");
});

