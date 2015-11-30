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
            game.move('x', 3)
                .board.should.equal('___x_____');
        });
        it("accepts moves as objects", function(){
            game.move({ side: 'x', square: 3})
                .board.should.equal('___x_____');
        });
        it("returns another game object for chaining", function(){
            game
                .move('x', 3)
                .move('o', 4)
                .board.should.equal('___xo____');
        });
        it("accepts a valid move from 'o'", function(){
            game
                .move('x', 3)
                .move('o', 4)
                .board.should.equal('___xo____');
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
            game = game.move('x', 3);
            (function(){
                game.move('x', 4);
            }).should.throw(msg);
        });
        it("rejects moves into non-empty squares", function(){
            var msg = "Invalid move, square not empty";
            game = game.move('x', 3);
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
            new TictactoeGame('xx_oo____')
                .move('x', 2)
                .winner.should.equal('x')
        });
        it("can be won with a vertical row", function(){
            new TictactoeGame('xo_xo____')
                .move('x', 6)
                .winner.should.equal('x');
        });
        it("can be won with a diagonal row", function(){
            new TictactoeGame('xo_ox____')
                .move('x', 8)
                .winner.should.equal('x');
        });
        it("can be won by 'o'", function(){
            new TictactoeGame('xx_oo__x_')
                .move('o', 5)
                .winner.should.equal('o');
        });
        it("rejects additional moves after a win", function(){
            var msg = "Invalid move, game already won";
            var game = new TictactoeGame('xx_oo____')
                .move('x', 2);
            game.move.bind(game, 'o', 5).should.throw(msg);
        });
    });
});
