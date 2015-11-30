var move = function(square){
    return {
        square: square,
        side: match.me.side
    }
};

var makeMove = function(square){
    superagent.patch('/matches/'+match.id)
        .send(move(square))
        .set('Accept', 'application/json')
        .end(function(err, res){
            console.log('made request');
        });
};

$(document).ready(function(){
    $('.square').click(function(){
        var square = this.id.split('s')[1];
        makeMove(square);
    });
});
