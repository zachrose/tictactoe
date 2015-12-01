/*
   Stupid implementation while we sort out the API
   :-P
*/
var superagent = require('superagent');
var Game = require('../../lib/tictactoe_game');
var $ = require('jquery');
var redux = require('redux');

var reducer = function(state, action){
    if(!state) return {
        board: '_________',
        winner: null
    };
    return new Game(state.board).move(action.payload);
};

window.store = redux.createStore(reducer);

store.subscribe(function(){
    render(store.getState());
});

var render = function(state){
    var square = function(side, index){
        if(side == '_') side = '';
        return "<div id='s"+index+"' class='square "+side+"' onclick='makeMove("+index+")'>"+side+"</div>";
    };
    var board = state.board.split('').map(square);
    $('#board').html(board);
};

var handleError = function(err, res){
    if(res && res.body && res.body.message){
        $('#error').text(res.body.message);
    }
};

window.makeMove = function(square){
    superagent.patch('/matches/'+initialState.id)
        .send({square: square})
        .set('Accept', 'application/json')
        .end(handleError);
};

var parse = function(event){
    var event = JSON.parse(event.data);
    var handlers = {
        move: function(move){
            console.log('dispatching', move);
            store.dispatch({type: 'move', payload: move});
        }
    }
    handlers[event.type](event.payload);
};

var connect = function(){
    var wsUrl = "ws://"+location.host+"/matches/"+initialState.id;
    var ws = new WebSocket(wsUrl);
    ws.onmessage = parse;
};

$(document).ready(connect);

