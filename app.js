var express = require('express');
var app = express();

var validateMove = function(move, player, cb){
    cb(); // assume ok for now
};

app.get('/', function(req, res){
    res.status(200).send("OK");
});

app.post('/game', function(req, res){

});

app.get('/game/:id', function(req, res){
    var id = req.params.id;
    games.find(id, function(err, game){
        if(err) return res.status(500).send();
        if(!game) return res.status(404).send({ message: "No such game" });
        if(game) return res.status(200).send(game.toJSON());
    });
});

app.patch('/game/:id', function(req, res){
    var id = req.params.id;
    var move = req.body;
    var context = {};
    async.waterfall([
        // validate in context of game
        validateMove.call(context, req.body, req.player),
        games.find.call(context, id),
        makeMove(move),
        saveMove
    ], function(err, game){
        if(err.isMine) return res.status(500).send();
        if(err.isTheirs) return res.status(400).send(err);
        if(game) res.status(204).send(game.toJSON());
        // notify players
    });
});

module.exports = app;
