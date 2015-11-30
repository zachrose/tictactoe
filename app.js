var path = require('path');
var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(bodyParser.json());

app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: 'blackbird singing in the dead of night',
    name: 'session-id'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var determineSide = require('./lib/side');
var matches = require('./lib/matches');
var present = require('./lib/presenter');

app.post('/matches', function(req, res){
    var player = req.sessionID;
    var match = matches.createOrJoin(player);
    // if(err) return res.status(500).send();
    res.format({
        json: function(){
            res.send(match);
        },
        html: function(){
            res.render('match', present(match, player));
        }
    });
});

app.get('/matches/:id', function(req, res){
    var player = req.sessionID;
    var id = req.params.id;
    var match = matches.find(id);
    if(!match) return res.status(404).send({ message: "No such game" });
    res.format({
        json: function(){
            res.send(match);
        },
        html: function(){
            res.render('match', present(match, player));
        }
    });
});

app.patch('/matches/:id', function(req, res){
    try{
        var player = req.sessionID;
        var id = req.params.id;
        var match = matches.find(id);
        var side = determineSide(player, match);
        var move = _.extend(req.body, { side: side });
        var match = matches.makeMove(id, move);
    }catch(e){
        var theirs = (e.name === 'PlayerError');
        var status = theirs ? 400 : 500;
        var message = theirs ? e.message : "Internal error";
        return res.status(status).send({ message: message });
    }
    res.format({
        json: function(){
            res.send(match);
        },
        html: function(){
            res.render('match', present(match, player));
        }
    });
});

module.exports = app;
