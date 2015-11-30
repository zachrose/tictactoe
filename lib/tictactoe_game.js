var NotYourTurnError = new Error("Invalid move, not your turn");
var InvalidMoveSquareNotEmptyError = new Error("Invalid move, square not empty");
var InvalidMoveError = new Error("Invalid move");
var GameAlreadyWonError = new Error("Invalid move, game already won");

function splice(str, index, count, add) {
      var ar = str.split('');
        ar.splice(index, count, add);
          return ar.join('');
}

var TictactoeGame = function(board){
    this.board = board || '_________';
    this.winner = this._winner();
};

TictactoeGame.prototype.toJSON = function(){
    return {
        board: this.board,
        winner: this.winner
    };
};

TictactoeGame.prototype.move = function(side, square){
    if(typeof side == 'object'){
        square = side.square;
        side = side.side;
    }
    var expectedSide = this._whoseTurn();
    var alreadyFilled = this._isAlreadyFilled(square);
    var isNonsenseMove = this._isNonsenseMove(side, square);
    if(this.winner) throw GameAlreadyWonError;
    if(isNonsenseMove) throw InvalidMoveError;
    if(side !== expectedSide) throw NotYourTurnError;
    if(alreadyFilled) throw InvalidMoveSquareNotEmptyError;
    var board = splice(this.board, square, 1, side);
    return new TictactoeGame(board);
};

TictactoeGame.prototype._whoseTurn = function(){
    var xs = (this.board.match(/x/g) || []).length;
    var os = (this.board.match(/o/g) || []).length;
    if(xs + os === 9) return null;
    return (os < xs) ? 'o' : 'x'
};

TictactoeGame.prototype._isAlreadyFilled = function(square){
    var char = this.board.charAt(square);
    var k = !(char === '_');
    return k;
};

TictactoeGame.prototype._isNonsenseMove = function(side, square){
    var sideOk = side === 'x' || side === 'o';
    var squareOk = square >= 0 && square < 9;
    return !(sideOk && squareOk);
};

TictactoeGame.prototype._winner = function(){
    var chars = this.board.split('');
    var row1 = chars[0]+chars[1]+chars[2];
    var row2 = chars[3]+chars[4]+chars[5];
    var row3 = chars[6]+chars[7]+chars[8];
    var col1 = chars[0]+chars[3]+chars[6];
    var col2 = chars[1]+chars[4]+chars[7];
    var col3 = chars[2]+chars[5]+chars[8];
    var diag1 = chars[0]+chars[4]+chars[8];
    var diag2 = chars[2]+chars[4]+chars[6];
    var x1 = row1 === 'xxx' || row2 === 'xxx' || row3 === 'xxx';
    var x2 = col1 === 'xxx' || col2 === 'xxx' || col3 === 'xxx';
    var x3 = diag1 === 'xxx' || diag2 === 'xxx';
    var o1 = row1 === 'ooo' || row2 === 'ooo' || row3 === 'ooo';
    var o2 = col1 === 'ooo' || col2 === 'ooo' || col3 === 'ooo';
    var o3 = diag1 === 'ooo' || diag2 === 'ooo';
    var x = x1 || x2 || x3;
    var o = o1 || o2 || o3;
    if(x) return 'x';
    if(o) return 'o';
    return null;
};

module.exports = TictactoeGame;

