//@ts-check
var schedule = require('node-schedule');

class Scheduler {
    constructor() {
        this.actions = {};
    }

    _schedule = ({id, action, date}) => {

        const ddd = schedule.scheduleJob(date, function(){
            action();
            console.log('sent')
        });
    }

    cancel = ({id}) => {
        if (this.actions[id]) {
            this.actions[id].cancel();
            delete this.actions[id];
        }
    }

    scheduleForTwoHours = (action, id) => {
        let date = new Date()
        date.setHours(date.getHours() + 2)
        this._schedule({action, id, date});
    }
    
    scheduleForFourHours = (action, id) => {
        let date = new Date()
        date.setHours(date.getHours() + 4)
        this._schedule({action, id, date});
    }
    
    scheduleForTwoFourHours = (action, id) => {
        let date = new Date()
        date.setDate(date.getDate() + 1)
        this._schedule({action, id, date});
    }

    scheduleForFourtyEightHours = (action, id) => {
        let date = new Date()
        date.setDate(date.getDate() + 1)
        this._schedule({action, id, date});
    }

    scheduleForTwoSeconds = (action, id) => {
        let date = new Date()
        date.setSeconds(date.getSeconds() + 2)
        this._schedule({action, id, date});
    }

    scheduleForTwoMinutes = (action, id) => {
        let date = new Date()
        date.setMinutes(date.getMinutes() + 1)
        this._schedule({action, id, date});
    }

    _calculateWithDayCron = (dday) => {
        const date = new Date();
        const day = date.getDay();
        let newDay = day + dday;
        if (newDay > 7) {
            newDay = newDay - (7);
        }
        return newDay;
    }

    _calculateWithHoursCron = (dhour) => {
        const date = new Date();
        const hour = date.getDay();
        let newHour = hour + dhour;
        if (newHour > 24) {
            newHour = newHour - (24);
        }
        return newHour;
    }

    _calculateWithSecondsCron = (ssec) => {
        const date = new Date();
        const sec = date.getSeconds();
        let newSec = sec + ssec;
        if (newSec > 60) {
            newSec = newSec - (60);
        }
    
        return newSec;
    }

    _calculateWithMinutesCron = (mmin) => {
        const date = new Date();
        const min = date.getSeconds();
        let newMin = min + mmin;
        if (newMin > 60) {
            newMin = newMin - (60);
        }
    
        return newMin;
    }

}

module.exports = Scheduler;