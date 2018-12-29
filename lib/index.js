
const uuid = require('uuid-v4');
const moment = require('moment');

const EventEmitter = require('events');

class Agent extends EventEmitter {
  constructor(name) {
    super();
    this.id = uuid();
    this.name = name;
    this.stimuli = {};
    this.message = '';
    this.isAlive = false;
  }

  start() {
    this.birthday = moment().format();
    this.isAlive = true;
    return this.birthday && this.isAlive;
  }

  kill() {
    this.deathday = moment().format();
    this.isAlive = false;
    return (this.deathday, this.isAlive);
  }

  tell(evnt, to) {
    if (this.isAlive === true) {
      to.emit(evnt.name, evnt.msg);
    } else {
      return console.log(`Error. ${this.name} is not alive`);
    }
  }

  listen(evnt, from, response) {
    this.on(evnt.name, () => {
      if (this.isAlive === true) {
        response();
      } else {
        return console.log(`Error. ${this.name} is not alive`);
      }
    });
  }
} // END AGENT

module.exports = Agent;
