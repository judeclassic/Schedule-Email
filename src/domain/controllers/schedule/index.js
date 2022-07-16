//@ts-check
const _BaseController = require('../_base/base');

const RequestHandler = require("../../../lib/handlers/request"); //TODO: REMOVE THIS
const Scheduler = require("../../services/schedule");            //TODO: REMOVE THIS

class ScheduleController extends _BaseController {

    /**
    * @param {{scheduleService: Scheduler, requestHandler: RequestHandler}} param   //TODO: REMOVE THIS
    */

    constructor({scheduleService, requestHandler}){
        super({host: '/v1/api/schedule'});
        this.scheduler = scheduleService;
        this.requestHandler = requestHandler;
        requestHandler._addHost(this._host);
    }

    setMessage = () => {
        return this.requestHandler.postWithBodyAndKey('/set', async ({ body}, send) => {

            const response = await this.scheduler.schedule(body, body.time || '2s');
            if (response.status)
                return send(200, {
                    status: true,
                    message: response.message,
                    shedule: response.data
                });
            else
                return send(403, {
                    status: false,
                    error: response.error,
                });
            
        });
    }

    cancelMessage = () => {
        return this.requestHandler.postWithBodyAndKey('/cancel', async ({ body }, send ) => {
            const { id } = body;

            const response = await this.scheduler.cancelSchedule({ id });
            send(200, {
                status: true,
                ...response
            });
        });
    }
}

module.exports = ScheduleController;