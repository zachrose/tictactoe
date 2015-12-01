/*
   Stupid implementation while we sort out the API
   :-P
*/
var superagent = require('superagent');
var $ = require('jquery');

var move = function(square){
    var m = {
        square: square
    }
    return m;
};

var updateView = function(_match){
    var squares = _match.board.split('');
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

var parse = function(event){
    var data = JSON.parse(event.data);
    var type = data.type;
    var payload = data.payload;
    var handlers = {
        move: function(payload){
            var index = payload.square;
            var value = payload.side;
            $('.square:eq('+index+')').text(value);
        }
    }
    handlers[type](payload);
};

var connect = function(){
    var host = window.location.host;
    var matchId = window.match.id;
    var wsUrl = "ws://"+host+"/matches/"+matchId;
    var ws = new WebSocket(wsUrl);
    ws.onerror = function(){
        console.log('websocket error');
    };
    ws.onopen = function(){
        console.log('websocket is open');
    };
    ws.onmessage = function(event){
        parse(event);
    };
};

$(document).ready(function(){
    connect();
    $('.square').click(function(){
        var square = this.id.split('s')[1];
        makeMove(square);
    });
});
