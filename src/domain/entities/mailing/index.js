const BaseEntity = require("../_base");

//@ts-check
class MailingEntity extends BaseEntity {
    constructor() {
        super();
        this.strongChecked = true;
    }

    validateModel = ({ id, name, email, template, position }) => {
        try {
            let error = [];

            const idValidity = this._validateID(id);
            if (id && !idValidity.status) {
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

            const positionValidity = this._validateWithStandard({position});
            if (!positionValidity.status) {
                
                error.push(positionValidity.messages)
            }

            const templateValidity = this._validateTemplate(template);
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
                data: {...emailValidity.data, ...nameValidity.data, ...templateValidity.data, ...positionValidity.data}
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