
class BaseHandler {
    constructor ({ route }) {
        this.route = route;
    }

    _addHost = (host) => {
        this.host = host;
    }

    _post = (path, ...args) => {
        const host = `${this.host}${path}`;
        return this.route.post(host, ...args);
    }

}

module.exports = BaseHandler;