//@ts-check
const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const config = require('../../constants/config').mailer;

const DEFAULT_FROM_EMAIL = config.DEFAULT_FROM_EMAIL;
const DEFAULT_NAME = config.DEFAULT_NAME;

const DEFAULT_SES_HOST = config.DEFAULT_SES_HOST;
const DEFAULT_SES_USER = config.DEFAULT_SES_USER;
const DEFAULT_SES_PASSWORD = config.DEFAULT_SES_PASSWORD;


class Mailer {
    constructor(){
        this.init();
    }

    init = async ()=>{

        this.transporter = nodeMailer.createTransport({
            pool: true,
            maxConnections: 1,
            host: DEFAULT_SES_HOST,
            port: 465,
            secure: true,
            auth: {
                user: DEFAULT_SES_USER,
                pass: DEFAULT_SES_PASSWORD,
            },
        });
    }

    async sendEmail(message) {
        try {
            const res =  await this.transporter.sendMail({...message, from: `${DEFAULT_FROM_EMAIL} ${DEFAULT_NAME}`});
            console.log(res);
        } catch (error) {
            console.error("Sending Email failed");
            console.error(error);
            return error;
        }
    }

    async sendReminderEmail(to, message) {
        const { name, subject, template } = message;
        let htmlContent = fs.readFileSync(path.join(__dirname, `../../../../public/emails/${template}.html`)).toString();
        htmlContent = htmlContent.replace('{{name}}', name);
         
        const MAIL_CONTENT = {
            to: to, // list of receivers
            subject: subject, // Subject line
            html: htmlContent, // html body
        }
        
        return this.sendEmail(MAIL_CONTENT);
     }
}

module.exports = Mailer;
