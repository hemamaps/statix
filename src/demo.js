var Statix = require('./statix').Statix;
var demoConfiguration = require('./config.js');

var statix = new Statix(demoConfiguration);

statix.server();
