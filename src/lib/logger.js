var chalk = require('chalk');

class Logger {
    constructor() {
    }

    log(message) {
        console.log(message);
    }

    logDelete(message) {
        console.log(chalk.red(message));
    }

    logUpdate(message) {
       console.log(chalk.blue(message));
    }

    logAdd(message) {
        console.log(chalk.green(message));
    }
}


module.exports = Logger;