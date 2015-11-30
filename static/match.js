var move = function(square){
    var m = {
        square: square
    }
    console.log(m);
    return m;
};

var updateView = function(match){
    var squares = match.board.split('');
    console.log(squares);
    squares.forEach(function(value, index){
        $('.square:eq('+index+')').text(value);
    });
};

var makeMove = function(square){
    superagent.patch('/matches/'+match.id)
        .send(move(square))
        .set('Accept', 'application/json')
        .end(function(err, res){
            updateView(res.body);
        });
};

$(document).ready(function(){
    $('.square').click(function(){
        var square = this.id.split('s')[1];
        makeMove(square);
    });
});
