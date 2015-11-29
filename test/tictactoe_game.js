require('./helper');
var TictactoeGame = rootRequire('lib/tictactoe_game');

describe("TictactoeGame", function(){
    var game;
    beforeEach(function(){
        game = new TictactoeGame();
    });
    describe("moves", function(){
        it("starts with an empty board", function(){
            game.board.should.equal('_________');
        });
        it("accepts a valid move from 'x'", function(){
            game.move('x', 3);
            game.board.should.equal('___x_____');
        });
        it("accepts a valid move from 'o'", function(){
            game.move('x', 3);
            game.move('o', 4);
            game.board.should.equal('___xo____');
        });
    });
    describe("validation", function(){
        it("rejects a starting move from 'o'", function(){
            var msg = "Invalid move, not your turn";
            (function(){
                game.move('o', 4);
            }).should.throw(msg);
        });
        it("rejects consecutive moves from 'x'", function(){
            var msg = "Invalid move, not your turn";
            game.move('x', 3);
            (function(){
                game.move('x', 4);
            }).should.throw(msg);
        });
        it("rejects moves into non-empty squares", function(){
            var msg = "Invalid move, square not empty";
            game.move('x', 3);
            (function(){
                game.move('o', 3);
            }).should.throw(msg);
        });
        it("rejects nonsense moves", function(){
            var msg = "Invalid move";
            game.move.bind(game, 'x', 10).should.throw(msg);
            game.move.bind(game, 'f', 3).should.throw(msg);
            game.move.bind(game, 'chicken', 'wing').should.throw(msg);
        });
    });
    describe("winning", function(){
        it("can be won with a horizontal row", function(){
            game.jumpTo('xx_oo____');
            game.move('x', 2);
            game.winner.should.equal('x');
        });
        it("can be won with a vertical row", function(){
            game.jumpTo('xo_xo____');
            game.move('x', 6);
            game.winner.should.equal('x');
        });
        it("can be won with a diagonal row", function(){
            game.jumpTo('xo_ox____');
            game.move('x', 8);
            game.winner.should.equal('x');
        });
        it("can be won by 'o'", function(){
            game.jumpTo('xx_oo__x_');
            game.move('o', 5);
            game.winner.should.equal('o');
        });
        it("rejects additional moves after a win", function(){
            var msg = "Invalid move, game already won";
            game.jumpTo('xx_oo____');
            game.move('x', 2);
            game.move.bind(game, 'o', 5).should.throw(msg);
        });
    });
});
