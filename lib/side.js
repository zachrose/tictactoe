module.exports = function(player, match){
    if(!match) return;
    if(player === match.player_x) return 'x';
    if(player === match.player_o) return 'o';
};

