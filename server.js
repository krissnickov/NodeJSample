/* var http = require('http');
var port = process.env.port || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
*/

var http = require("http");

var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var controllers = require("./controllers");
var app = express();

// parse urlencoded request bodies into req.body
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// use cookies parser
app.use(cookieParser());

//app.use(express.session({ secret: "bongo35" }));
app.use(session({
    secret: 'boby2cat366',
    resave: false,
    saveUninitialized: true
}));

// set the flash message
app.use(flash());

// Setup the View Engine
// app.set("view engine", "jade");
// app.engine("ejs", ejsEnjine);
// app.set("view engine", "ejs");

app.set("view engine", "vash");

// set the public static recourse folder
app.use(express.static(__dirname + "/public"));

// map the routes
controllers.init(app);

// main route
app.get("/", function (req, res) {
    // res.send("<html><body><h1>Express 4</h1></body></html>");
    // res.render("ejs/index", { title: "Exppres + EJS 1.00" });
    res.render("index", { title: "Welcome to NodeJS Sample  App " });
});

var server = http.createServer(app);
server.listen(process.env.PORT || 8080);

//var http = require('http');



//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/html' });
//    res.end('Hello, world!');
//
//}).listen(process.env.PORT || 8080);