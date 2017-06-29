var express = require('express');

var app = module.exports = express();

var bodyParser = require('body-parser');

var allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
//    res.header('Access-Control-Allow-Origin', 'localhost:5000');
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
//    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}

app.listen(5000);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extend: true
}));

app.use(allowCors);