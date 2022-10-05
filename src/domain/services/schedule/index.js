//@ts-check
const ScheduleRepo = require("../../../lib/modules/scheduler");
const MailerRepo = require("../../../lib/modules/mailer");
const FileRepo = require("../../../lib/modules/files");
const MailingEntity = require("../../entities/mailing");

class Schedule {
    /**
     * 
     * @param {{ mailerRepo: MailerRepo, scheduleRepo: ScheduleRepo, fileRepo: FileRepo, mailingEntity: MailingEntity, logger: any}} param0
     */
    constructor({ mailerRepo, scheduleRepo, fileRepo, mailingEntity, logger }) {
        this.scheduleRepo = scheduleRepo;
        this.mailerRepo = mailerRepo;
        this.fileRepo = fileRepo;
        this.mailingEntity = mailingEntity;
        this.logger = logger;
    }


    schedule = async (value, time) => {
        try {
            const data = await this.mailingEntity.validateModel({ id: value.id, email: value.email, name: value.name, template: value.template, subject: value.subject });
            if (!data.status || typeof(data.data) === 'string') {
                return {
                    status: false,
                    error: data.error
                };
            }

            const { id, subject } = value;
            const { firstName, email } = data.data;

            const htmlResult = await this.fileRepo.getHtmlFromDirectoryByTemplate(value.template);
            if (!htmlResult.status) {
                return {status: false, error: htmlResult.error}
            }

            const action = async () => {
                this.mailerRepo.sendReminderEmail(email, subject, htmlResult.data, { name: firstName });
            }

            switch (time) {
                case '2m':
                    this.scheduleRepo.scheduleForTwoMinutes(action, id);
                    break;
                case '2h':
                    this.scheduleRepo.scheduleForTwoHours(action, id);
                    break;
                case '4h':
                    this.scheduleRepo.scheduleForFourHours(action, id);
                    break;
                case '24h':
                    this.scheduleRepo.scheduleForTwoFourHours(action, id);
                    break;
                case '48h':
                    this.scheduleRepo.scheduleForFourtyEightHours(action, id);
                    break;
                default:
                    return {status: false, error: "you need to enter a valid time '2s', '2m', '24h', '48h'"}
            }

            return {status: true, message: 'schedule was set successfully, you can check your webhook'}
            
        } catch (error) {
            return {status: false, error}

        }
    }

    cancelSchedule = ({ id }) => {
        this.scheduleRepo.cancel({id});
        this.logger.inform('cancel with ' + id );
        return {status: true, message: 'cancelled was set successfully,'}
    }
}

module.exports = Schedule;