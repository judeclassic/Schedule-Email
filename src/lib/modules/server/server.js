const http = require('http');
const https = require('httpolyglot');

class Server {
    constructor({app, port, logger}) {
        this.http = http;
        this.https = https
        this.app = app;
        this.port = port
        this.logger = logger;
        this._setEnvironment();
    }

    _setEnvironment = ()=> {
        if (process.env.NODE_ENV !== 'production') {
            require('dotenv').config({path: '../../../../.env'});
        }
    }

    production = (message, config) => {
        const port = process.env.PORT;
        this.server = this.https.createServer(this.app, config);
        this.server.listen(port, ()=> {
            this.isWorking = true;
            this.logger.info(`${message} on port ${port}`);
        });
    }

    development = (message) => {
        const port = process.env.PORT || this.port;
        this.server = this.http.createServer(this.app);
        this.server.listen(port, ()=> {
            this.isWorking = true;
            this.logger.info(`${message} on port ${port}`);
        });
    }

    close = () => {
        this.server.close();
        this.isWorking = false;
    }
}

module.exports = Server;