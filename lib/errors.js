var playerErrors = {
    NotYourTurn: ("Invalid move, not your turn"),
    SquareTaken: ("Invalid move, square not empty"),
    InvalidMove: ("Invalid move"),
    GameAlreadyOver: ("Invalid move, game already over")
}

var PlayerError = function(message){
    this.name = 'PlayerError';
    this.message = message;
};

PlayerError.prototype = Object.create(Error.prototype);
PlayerError.prototype.constructor = PlayerError;

for(error in playerErrors){
    var message = playerErrors[error];
    module.exports[error] = new PlayerError(message);
}
