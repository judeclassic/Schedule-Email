//@ts-check
const Cron = require('node-cron');

class Scheduler {
    constructor() {
        this.actions = {};
    }

    _schedule = ({id, action, cron, repeated}) => {
        this.actions[id] = Cron.schedule(cron, () => {
            action();
            if (!repeated) {
                this.actions[id].stop();
            }
        }, {
            scheduled: false,
        });
        this.actions[id].start();
    }

    cancel = ({id}) => {
        if (this.actions[id]) {
            this.actions[id].stop();
            delete this.actions[id];
        }
    }

    scheduleForTwoFourHours = (action, id) => {
        const days = this._calculateWithDayCron(1);
        let cron = `* * * * * ${days}`;
        this._schedule({action, id, cron, repeated:false});
    }

    scheduleForFourtyEightHours = (action, id) => {
        const days = this._calculateWithDayCron(2);
        let cron = `* * * * * ${days}`;
        this._schedule({action, id, cron, repeated:false});
    }

    scheduleForTwoSeconds = (action, id) => {
        const sec = this._calculateWithSecondsCron(2);
        let cron = `* * * * * *`;
        this._schedule({action, id, cron, repeated:false});
    }

    scheduleForTwoMinutes = (action, id) => {
        const min = this._calculateWithMinutesCron(2);
        let cron = `* * * * *`;
        this._schedule({action, id, cron, repeated:false});
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