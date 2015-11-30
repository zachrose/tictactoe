var EventEmitter = require('events').EventEmitter;

var Bus = function(){
    EventEmitter.call(this);
};
Bus.prototype = Object.create(EventEmitter.prototype);
Bus.prototype.trigger = Bus.prototype.emit; // alias

module.exports = new Bus();
