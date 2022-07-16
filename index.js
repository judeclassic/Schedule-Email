const server = require("./src/lib/modules/server");
const Logger = require("./src/lib/modules/logger");
const scheduleRouter = require('./src/routes/schedule');
const logRouter = require('./src/routes/logs');

const port = 6000;

const logger = new Logger();

const callback = (route)=> {
    scheduleRouter(route, logger);
    logRouter(route);
}

module.exports = server({logger, port, callback});