#!/usr/bin/env node

var app = require('./app');
var port = 8080;
app.listen(port, function(){
    console.log("tic tac toe is running on port ", port);
});
