//@ts-check
const BaseEntity = require("../_base");

class MailingEntity extends BaseEntity {
    constructor() {
        super();
        this.strongChecked = true;
    }

    validateModel = ({ id, name, email, template, subject }) => {
        try {
            let error = [];

            const idValidity = this._validateID(id);
            if (!idValidity.status) {
                error.push(idValidity.messages)
            }

            const emailValidity = this._validateEmail(email);
            if (!emailValidity.status) {
                error.push(emailValidity.messages)
            }

            const nameValidity = this._validateName(name);
            if (!nameValidity.status) {
                error.push(nameValidity.messages)
            }

            const validateSubject = this._validateSubject(subject);
            if (!validateSubject.status) {
                error.push(validateSubject.messages)
            }

            const templateValidity = this._validateTemplateLink(template);
            if (!templateValidity.status) {
                error.push(templateValidity.messages)
            }

            if (error.length !== 0){
                console.log(error)
                return {
                    status: false,
                    error,
                }
            }

            return {
                status: true,
                data: {...emailValidity.data, ...nameValidity.data, ...templateValidity.data,}
            }

        } catch(err) {
            console.log(err);
            return {
                status: false,
                data: 'Error when validating Data'
            }
        }
    }
}

module.exports = MailingEntity;