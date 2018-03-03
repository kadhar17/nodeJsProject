"use strict";

var express = require('express');
var appexp = express();
var qs = require('querystring');
var url = require("url");
var mysql =  require('mysql');

appexp.use(function(req, res, next) {
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
      host     : 'localhost',
      user     : 'root',
      password : 'root',
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
      var queryUpdate = 'Insert into userinfo (name,age,phone,doj,desg,photo)  VALUES ("'+ data.name +'","'+ data.age +'", "'+ data.phone +'", "'+ data.doj +'", "'+ data.desg +'", "'+ data.photo +'" )';
      console.log(queryUpdate);
      con.query(queryUpdate,function(err,rows){

        if(err) throw err;
        res = rows;
      });
    }
    //
    if(mode == "update")
    {
      console.log("update");
      var queryUpdate = 'UPDATE userinfo SET name = "'+data.name+'", age = "'+data.age+'", doj = "'+data.doj+'", desg = "'+data.desg+'", photo = "'+data.photo+'" WHERE phone = "'+data.phone+'"';
      con.query(queryUpdate,function(err,rows){

        if(err) throw err="error";
        res = rows;
      });
    }
    //
    if(mode == "fetch")
    {
      var querySelect = 'SELECT name,age,doj,desg,photo FROM userinfo WHERE phone = "'+data.phone+'"';
      con.query(querySelect,function(err,rows){
        if(err) throw err;
         res = rows;
      });
    }
    //
     //
     if(mode == "delete")
     {
       console.log("delete");
       var queryDelete = 'DELETE FROM userinfo WHERE phone = "'+data.phone+'"';
       con.query(queryDelete,function(err,rows){
         if(err) throw err="error";
          res = rows;
       });
     }

     if(mode == "list")
     {
       console.log("list");
       var queryDelete = 'select * from userinfo';
       con.query(queryDelete,function(err,rows){
         if(err) throw err="error";
          res = rows;
       });
     }
     //
    con.end(function(err) {
      callback(res);
    });
}

var processData = new sqlProcess();



appexp.get('/add', function (request, response) {
    var queryData = url.parse(request.url, true).query;
   console.log(queryData);
    processData.sqlTest(queryData,"add",function(data,xml)
    {
       response.writeHead(200, {"Content-Type": "text/plain"});
       response.end(JSON.stringify({"response":"success"}));
    });
});

appexp.get('/update', function (request, response) {
    var queryData = url.parse(request.url, true).query;
    processData.sqlTest(queryData,"update",function(data,xml)
    {
       response.writeHead(200, {"Content-Type": "text/plain"});
        response.end(JSON.stringify({"response":"updated successfully"}));
    });
});

appexp.get('/fetch', function (request, response) {
    var queryData = url.parse(request.url, true).query;
     processData.sqlTest(queryData,"fetch",function(data,xml)
    {
       response.writeHead(200, {"Content-Type": "text/plain"});
       response.end(JSON.stringify(data));
    });
});

appexp.get('/delete', function (request, response) {
  var queryData = url.parse(request.url, true).query;
   processData.sqlTest(queryData,"delete",function(data,xml)
  {
     response.writeHead(200, {"Content-Type": "text/plain"});
     response.end(JSON.stringify({"response":"Data Removed"}));
  });
});

appexp.get('/list', function (request, response) {
  var queryData = url.parse(request.url, true).query;
   processData.sqlTest(queryData,"list",function(data,xml)
  {
     response.writeHead(200, {"Content-Type": "text/plain"});
     response.end(JSON.stringify(data));
  });
});


var server = appexp.listen(8030, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);

});

