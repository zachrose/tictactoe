var presentBoard = function(board){
    return board.split('').map(function(square){
        if(square === '_') return null;
        return square;
    });
};

module.exports = function(match, me){
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

