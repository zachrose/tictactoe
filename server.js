#!/usr/bin/env node

var app = require('./app');
var port = 8787;

app.listen(port, function(){
    console.log("Listening on port %d", port);
});
