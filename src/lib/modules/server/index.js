//@ts-check

const express = require('express');
const cors = require('cors');
const Server = require('./server');

const starter = ({logger, port, callback}) => {
    const app = express();

    app.use(cors());
    app.use(express.static('public'));

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(express.json());

    const server = new Server({app, port, logger});
    
    if (process.env.NODE_ENV === 'production') {
        server.production('running on production');
    } else {
        server.development('running on development');
    }
    callback(app);

    return {app, server};
}

module.exports = starter;