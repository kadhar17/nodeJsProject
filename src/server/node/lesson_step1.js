"use strict";

var express = require('express');
var app = express();
var fs = require("fs");
var qs = require('querystring');
var url = require("url");
var mysql =  require('mysql');

var server = app.listen(8030, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);

});

app.get('/add', function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("added");
});

/*app.get('/fetch', function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("updated");
});

*/