
const uuid = require('uuid-v4');
const moment = require('moment');
const topsis = require('topsis');

const EventEmitter = require('events');

const CapitalizeFirstLetterOfString = require('capitalizefirstletterofstring');

/*
class need {
}
*/

class Agent extends EventEmitter {
  constructor(name) {
    super();
    this.id = uuid();
    this.name = name;
    this.stimuli = {};
    this.message = '';
    this.isAlive = false;

    this.needs = [];
  }

  /*
  addNeed() {
    this.needs.push(new need);
  }
  */


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
        console.log(to.name);
      to.emit(`${evnt.name}From${CapitalizeFirstLetterOfString(to.name)}`, evnt.msg);
    } else {
      return console.log(`Error. ${this.name} is not alive`);
    }
  }


  decide(method, data) {
    switch (method) {
      case 'topsis':
        const result = topsis.getBest(data.m, data.w, data.ia);
        return result;
        break;
    }
  }

  predict(method, data) {
    switch (method) {
      case 'linear-regression':

        break;
    }
  }

  //
} // END AGENT

module.exports = Agent;
