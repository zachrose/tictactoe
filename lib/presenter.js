var determineSide = require('./side');

var presentBoard = function(board){
    return board.split('').map(function(square){
        if(square === '_') return null;
        return square;
    });
};

module.exports = function(match, player){
    var side = determineSide(player, match);
    return {
        id: match.id,
        side: side,
        board: presentBoard(match.board),
        json: JSON.stringify({
            id: match.id,
            side: side,
        })
    }
};

