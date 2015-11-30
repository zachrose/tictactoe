var path = require('path');
var express = require('express');
var app = express();

var validateMove = function(move, player, cb){
    cb(); // assume ok for now
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var matches = {
    find: function(id, cb){
        cb(null, {
            id: id,
            players: {
                'x': '123',
                'y': '789'
            },
            board: '__x_o__oo'
        });
    }
};

var presentBoard = function(board){
    return board.split('').map(function(square){
        if(square === '_') return null;
        return square;
    });
};

var present = function(match){
    var me = {
        side: 'x',
        id: '123'
    };
    return {
        id: match.id,
        me: me,
        players: match.players,
        board: presentBoard(match.board),
        json: JSON.stringify({
            id: match.id,
            me: me,
            players: match.players
        })
    }
};

app.post('/matches', function(req, res){

});

app.get('/matches/:id', function(req, res){
    var id = req.params.id;
    matches.find(id, function(err, match){
        if(err) return res.status(500).send();
        if(!match) return res.status(404).send({ message: "No such game" });
        res.format({
            json: function(){
                res.send(match);
            },
            html: function(){
                res.render('match', present(match));
            }
        })
    });
});

app.patch('/matches/:id', function(req, res){
    var id = req.params.id;
    var move = req.body;
    var context = {};
    async.waterfall([
        // validate in context of match
        validateMove.call(context, req.body, req.player),
        matches.find.call(context, id),
        makeMove(move),
        saveMove
    ], function(err, match){
        if(err.isMine) return res.status(500).send();
        if(err.isTheirs) return res.status(400).send(err);
        if(match) res.status(204).send(game.toJSON());
        // notify players
    });
});

module.exports = app;
