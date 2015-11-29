var NotYourTurnError = new Error("Invalid move, not your turn");
var InvalidMoveSquareNotEmptyError = new Error("Invalid move, square not empty");
var InvalidMoveError = new Error("Invalid move");
var GameAlreadyWonError = new Error("Invalid move, game already won");

function splice(str, index, count, add) {
      var ar = str.split('');
        ar.splice(index, count, add);
          return ar.join('');
}

var TictactoeGame = function(){
    this.board = '_________';
    this.winner = null;
};

TictactoeGame.prototype._whoseTurn = function(){
    var xs = (this.board.match(/x/g) || []).length;
    var os = (this.board.match(/o/g) || []).length;
    if(xs + os === 9) return null;
    return (os < xs) ? 'o' : 'x'
};

TictactoeGame.prototype._isAlreadyFilled = function(position){
    var char = this.board.charAt(position);
    var k = !(char === '_');
    return k;
};

TictactoeGame.prototype._isNonsenseMove = function(side, position){
    var sideOk = side === 'x' || side === 'o';
    var positionOk = position >= 0 && position < 9;
    return !(sideOk && positionOk);
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

TictactoeGame.prototype.jumpTo = function(state){
    this.board = state;
};

TictactoeGame.prototype.move = function(side, position){
    var expectedSide = this._whoseTurn();
    var alreadyFilled = this._isAlreadyFilled(position);
    var isNonsenseMove = this._isNonsenseMove(side, position);
    if(this.winner) throw GameAlreadyWonError;
    if(isNonsenseMove) throw InvalidMoveError;
    if(side !== expectedSide) throw NotYourTurnError;
    if(alreadyFilled) throw InvalidMoveSquareNotEmptyError;
    this.board = splice(this.board, position, 1, side);
    this.winner = this._winner();
};

module.exports = TictactoeGame;

