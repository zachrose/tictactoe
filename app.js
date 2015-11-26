var express = require('express');
var expressWs = require('express-ws');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var easyauth = require('./lib/easyauth');

var lobby = [];
var games = [];

var app = express(); 

expressWs(app);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(easyauth);

app.use(function(req, res, next){
    req.player = req.cookies.token;
    next();
});

app.get('/game/:gameId', function(req, res){
    var gameId = req.params.gameId;
    var game = games.find(byId(gameId));
    var status = game ? 200 : 400;
    res.status(status).send(game || { error: 'no such game' });
});

app.post('/game/:gameId/move', function(req, res){
    var move = req.body.move;
    var game = games.find(byId(gameId));
    game.move({
        player: req.player,
        move: move
    }, function(err){
        var status = err ? 201 : 400;
        var response = err || { move: 'ok' };
        res.status(status).send(response);
    });
});

app.ws('/notifications', function(ws, req){
    console.log('yay');
});

app.get('/logout', function(req, res){
    var html = [
        '<form action="/logout" method="post">',
        '<input type="submit" value="Submit">',
        '<form>'
    ].join('');
    res.status(200).send(html);
});

app.post('/logout', function(req, res){
    res.cookie('token', '', { httpOnly: true });
    res.status(200).send("logged out!");
});

app.use(express.static('static'));
module.exports = app;
