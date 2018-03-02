"use strict";

var express = require('express');
var app = express();
var qs = require('querystring');
var url = require("url");
var mysql =  require('mysql');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


var sqlProcess = function() {}

sqlProcess.prototype.sqlTest = function(data,mode,callback){
    // First you need to create a connection to the db
    var res =  null;
    var con = mysql.createConnection({
      host     : '127.0.0.1',
      user     : 'root',
      password : 'admin',
      database : 'testing'
    });
    //
    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
     console.log('Connection established');
    });
    //
    if(mode == "add")
    {
      var queryUpdate = 'Insert into userinfo ( id, name, PhoneNo)  VALUES ("'+ data.id +'","'+ data.name +'", "'+ data.phoneNo +'" )';
      console.log(queryUpdate);
      con.query(queryUpdate,function(err,rows){

        if(err) throw err;
        res = rows;
      });
    }
    //
    if(mode == "update")
    {
      var queryUpdate = 'UPDATE userinfo SET PhoneNo = "'+data.phoneNo+'", name = "'+data.name+'" WHERE id = "'+data.id+'"';
      con.query(queryUpdate,function(err,rows){

        if(err) throw err;
        res = rows;
      });
    }
    //
    if(mode == "fetch")
    {
      var querySelect = 'SELECT name, phoneNo FROM userinfo WHERE id = "'+data.id+'"';
      con.query(querySelect,function(err,rows){
        if(err) throw err;
         res = rows;
      });
    }
    //
    con.end(function(err) {
      callback(res);
    });
}

var processData = new sqlProcess();



app.get('/add', function (request, response) {
    var queryData = url.parse(request.url, true).query;
   // console.log(queryData);
    processData.sqlTest(queryData,"add",function(data,xml)
    {
       response.writeHead(200, {"Content-Type": "text/plain"});
       response.end(JSON.stringify({"response":"success"}));
    });
});

app.get('/update', function (request, response) {
    var queryData = url.parse(request.url, true).query;
    processData.sqlTest(queryData,"update",function(data,xml)
    {
       response.writeHead(200, {"Content-Type": "text/plain"});
        response.end(JSON.stringify({"response":"updated successfully"}));
    });
});

app.get('/fetch', function (request, response) {
    var queryData = url.parse(request.url, true).query;
     processData.sqlTest(queryData,"fetch",function(data,xml)
    {
       response.writeHead(200, {"Content-Type": "text/plain"});
       response.end(JSON.stringify(data));
    });
});

var server = app.listen(8030, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);

});

