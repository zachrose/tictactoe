require('./helper');
var side = rootRequire('lib/side');

describe("side", function(){
    it("says when a player is side 'x'", function(){
        side('123', {
            player_x: '123'
        }).should.equal('x');
    });
    it("says when a player is side 'o'", function(){
        side('456', {
            player_x: '123',
            player_o: '456'
        }).should.equal('o');
    });
    it("says when a player is not a player", function(){
        (typeof (side('789', {}))).should.equal('undefined');
    });
});
