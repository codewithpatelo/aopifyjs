
const uuid = require('uuid-v4');
const moment = require('moment');
const topsis = require('topsis');
const ahp = require('ahp-lite');

const EventEmitter = require('events');

// const CapitalizeFirstLetterOfString = require('capitalizefirstletterofstring');

class Interaction {
  constructor(msg, evnt, from, to) {
    this.from = from;
    this.to = to;
    this.evnt = evnt;
    this.msg = msg;
    this.time = moment().format();
  }
}

class Agent extends EventEmitter {
  constructor(name) {
    super();
    this.id = uuid();
    this.name = name;
    this.isAlive = false;
    this.interactions = new Set();
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
      const interaction = new Interaction(evnt.msg, evnt.name, this.id, to.id);
      this.interactions.add(interaction);
    } else {
      return console.log(`Error. ${this.name} is not alive`);
    }
  }

  store(msg, evnt, from, to) {
    const interaction = new Interaction(msg, evnt, from, to);
    this.interactions.add(interaction);
    return this.interactions;
  }

  decide(method, data) {
    let result = '';
    switch (method) {
      case 'topsis':
        result = topsis.getBest(data.m, data.w, data.ia);
        return result;
        break;
      case 'ahp':
        result = ahp.getWeights(data);
        return result;
        break;
    }
  }
} // END AGENT

module.exports = Agent, Interaction;
