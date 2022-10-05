//@ts-check
class BaseEntity {
    constructor() {
        this.strongChecked = true;
    }

    _validateEmail = (email) => {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!email) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: "Email cannot be null"});
        }
        if (!emailRegex.test(email)) {
            if (/^@/.test(email)) {
                return ({status: false, messages: "email is inValid (@ is missing)"});
            }
            return ({status: false, messages: "email is inValid"});
        }
        return ({status: true, data: {email}});
    }

    _validatePassword = (password) => {
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

        if (!password ) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: "Password cannot be null"});
        }
        if (!passwordRegex.test(password)) {
            if (password.length < 8) {
                return ({status: false, messages: "Password is Invalid (password should greater than 8)"});
            }
            if (password.length > 30) {
                return ({status: false, messages: "Password is Invalid (password should less than 30)"});
            }
            return ({status: false, messages: "Password is Invalid (password should at least 1 capital, 1 small, 1 special, and 1 number)"});
        }
        return ({status: true, data: {password}});
    }

    _validateName = (name) => {
        if (!name) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: "name cannot be null"});
        }
        const names = name.split(" ");
        let firstName = names[0] || undefined;
        let surName = names[1] || undefined;
        let otherName = names[2] || undefined;

        return { status: true, data: {firstName, surName, otherName} }
    }

    _validateWithStandard = (obj) => {
        if (typeof(obj) !== 'object') {
            return ({status: false, messages: "entry of _validateWithStandard must be an object"});
        }
        let key  = Object.keys(obj)[0];
        if (!obj[key]) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: `${obj[key]} cannot be null`});
        }

        if (obj[key] < 3) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: `${obj[key]} cannot be lest than 3 characters`});
        }

        return { status: true, data: {...obj} }
    }

    _validateID = (id) => {
        if (!id) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ( {status: false, messages: "id cannot be null"} );
        }

        if ( id.length < 10 ) {
            return ({status: false, messages: "id cannot be less than 10 characters"});
        }

        if ( id.length > 40 ) {
            return ({status: false, messages: "id cannot be greater than 40 characters"});
        }

        return { status: true, data: {id} }
    }

    _validateTemplateLink = (link) => {
        let linkRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

        if (!link ) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: "Template Link cannot be null"});
        }
        if (!linkRegex.test(link)) {
            return ({status: false, messages: "Template Link is Invalid"});
        }
        return ({status: true, data: {link}});
    }

    _validateSubject = (link) => {

        if (!link ) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: "Subject cannot be null"});
        }
        return ({status: true, data: {link}});
    }

    _validateCountry = (country, countries) => {
        if (!country) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: "Country cannot be null"});
        }
        if (!countries) {
            return ({status: false, data: {country}, message: "list of countries returned null"});
        }
        if (!(country in countries)) {
            return ({status: false, messages: "country cannot be found in the accepted list of countries"});
        }

        return ({status: true, data: {country}});
    }

    _validateState = (state, states) => {
        if (!state) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: "Country cannot be null"});
        }
        if (!states) {
            return ({status: false, data: {state}, message: "list of countries returned null"});
        }
        if (!(state in states)) {
            return ({status: false, messages: "country cannot be found in the accepted list of countries"});
        }

        return ({status: true, data: {state}});
    }

    _validateAddress = (address) => {
        let addressRegex = /d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Rd|Blvd|Ln|St)\.?/;

        if (!address ) {
            if (!this.strongChecked) {
                return ({status: true});
            }
            return ({status: false, messages: "Address cannot be null"});
        }
        if (!addressRegex.test(address)) {
            if (address.length < 8) {
                return ({status: false, messages: "Address is Invalid (password should greater than 5)"});
            }
            if (address.length > 30) {
                return ({status: false, messages: "Password is Invalid (password should less than 50)"});
            }
            return ({status: false, messages: "Password is Invalid (password should at least 1 capital, 1 small, 1 special, and 1 number)"});
        }
        return ({status: true, data: {address}});
    }
    
}

module.exports = BaseEntity;