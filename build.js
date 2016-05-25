var exec = require('child_process').exec;
var cmd = 'babel src --out-dir dist --source-maps';
exec(cmd);