var Statix = require('./Statix');
var demoConfiguration = require('./demo-configuration');

demoConfiguration.useFileWatch = false;
var statix = new Statix(demoConfiguration);
statix.build();
