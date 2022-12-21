var mysql = require('mysql');
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Manipal"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');

app.get('/', function(req,res){
    res.render(path.join(__dirname,'./Public/test.html'));
});

app.post('/search', function(req,res){
    con.connect(()=>{
      con.query('SELECT Distance dist, Name name FROM Manipal WHERE Name =?', [req.body.plc], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
        if(err){
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        var x = row[0].name;
        res.render(__dirname ,'./Public/place.html', {name: 'John Doe'});
        console.log(row);
      });
    });
});

server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});
  