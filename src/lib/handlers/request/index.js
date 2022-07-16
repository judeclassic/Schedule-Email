//@ts-check
const BaseHandler = require('../_base');

class RequestHandler extends BaseHandler{
    /**
     * 
     * @param {{route: {get: Function, post: Function, put: Function, delete: Function}}} param0
     */

    constructor({route}) {
        super({ route })
    }
    /**
     * 
     * @returns {(req: any, res: any, next: Function) => void}
     */

    /**
     * 
     * @param {String} path 
     * @param {Function} callback 
     */

    post = (path, callback) => {
        this._post(path, (req, res) => {
            const { params } = req;
            /**
             * 
             * @param {number} code
             * @param {{code: number, message: String, error: any, data: any}} data
             */
            const _send = (code, data)=> {
                return res.status(code).json(data);
            }

            return callback({ params }, _send );
        })
    }


    /**
     * 
     * @param {String} path 
     * @param {Function} callback 
     */
    postWithBodyAndKey = (path, callback) => {
        this._post(path, (req, res) => {
            const { params, body } = req;
            
            /**
             * 
             * @param {number} code
             * @param {{code: number, message: String, error: any, data: any}} data
             */
            const _send = (code, data)=> {
                res.status(code).json(data);
            }

            return callback({ params, body }, _send );
        });
    }
}

module.exports = RequestHandler;