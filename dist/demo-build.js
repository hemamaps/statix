'use strict';

var Statix = require('./Statix');
var demoConfiguration = require('./demo-configuration');

demoConfiguration.useFileWatch = false;
var statix = new Statix(demoConfiguration);
statix.build();
//# sourceMappingURL=demo-build.js.map