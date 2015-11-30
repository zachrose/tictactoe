require('./helper');
var bus = rootRequire('lib/bus');

describe("bus", function(){
    it("triggers and emits events on a channel", function(){
        var channel = 'mygreatgame';
        var assert = function(event){
            event.type.should.equal('foo');
            event.payload.should.equal('something something');
        };
        bus.on(channel, assert);
        bus.trigger(channel, {
            type: 'foo',
            payload: 'something something'
        });
    });
});
