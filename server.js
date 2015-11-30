#!/usr/bin/env node

var express = require('express');
var app = require('./app');
var port = 8787;

app.use(express.static('static'));

app.listen(port, function(){
    console.log("Listening on port %d", port);
});
