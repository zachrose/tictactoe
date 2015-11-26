makeToken = function(){
    return Math.random().toString();
};

module.exports = function(req, res, next){
    console.log('coming in with: ', req.cookies);
    var token = req.cookies.token || makeToken();
    console.log('token is: ', token);
    res.cookie('token', token, { maxAge: 90000, httpOnly: true });
    console.log('setting token', token);
    next();
};
