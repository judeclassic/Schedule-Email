//@ts-check

const ScheduleController = require('../../domain/controllers/schedule');
const ScheduleService = require('../../domain/services/schedule');
const MailingEntity = require('../../domain/entities/mailing');

const RequestHandler = require('../../lib/handlers/request');

const Mailer = require('../../lib/modules/mailer');
const Files = require('../../lib/modules/files');
const Schedule = require('../../lib/modules/scheduler');


const router = (route, logger) => {


    const fileRepo = new Files();
    const mailerRepo = new Mailer();
    const scheduleRepo = new Schedule();

    const requestHandler = new RequestHandler({route});
    const mailingEntity = new MailingEntity();
    const scheduleService = new ScheduleService({ mailerRepo, scheduleRepo, fileRepo, mailingEntity, logger });

    const scheduleController = new ScheduleController({ scheduleService, requestHandler });

    scheduleController.init();
}

module.exports = router;