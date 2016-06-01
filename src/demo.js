var Statix = require('./statix').Statix;
var demoConfiguration = require('./statix.config.js');

var statix = new Statix(demoConfiguration);

statix.server();
