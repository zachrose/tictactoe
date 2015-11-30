var Game = require('./tictactoe_game');
var _ = require('underscore');
var matches = [];

var id = (function(){
    var startingId = 1;
    return function(){
        return startingId++;
    }
})();

var byId = function(id){
    return function(match){
        return match.id == id;
    };
};
var withOnePlayerWhoIsNot = function(user){
    return function(match){
        return match.player_x !== user && !match.player_o;
    }
};

module.exports = {
    createOrJoin: function(user){
        var incompleteMatch = _(matches).find(withOnePlayerWhoIsNot(user));
        var match;
        if(incompleteMatch){
            incompleteMatch.player_o = user;
            return incompleteMatch;
        }else{
            match = {
                id: id(),
                board: '_________',
                player_x: user
            };
            matches.push(match);
            return match;
        }
    },
    find: function(id){
        var match = _(matches).find(byId(id));
        return match;
    },
    makeMove: function(id, move){
        console.log('move', move);
        var match = _(matches).find(byId(id));
        if(!match) return null;
        console.log("making move", move);
        var game = new Game(match.board)
            .move(move);
        match.board = game.board;
        return match;
    }
};

