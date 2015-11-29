global.rootRequire = function(path){
    return require('../'+path);
};
require('should');
