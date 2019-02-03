'use strict'
const uuid = require('uuid-v4');
const moment = require('moment');
const topsis = require('topsis');
const ahp = require('ahp-lite');

const EventEmitter = require('events');

//const CapitalizeFirstLetterOfString = require('capitalizefirstletterofstring');

class Interaction {
    constructor(msg,evnt,from,to,time) {
      this.from = from;
      this.to = to;
      this.evnt = evnt;
      this.msg = msg;
      this.time = time;
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
      let time = moment().format();
      let interaction = new Interaction(evnt.msg, evnt.name, this.id, to.id, time);
      this.interactions.add(interaction);
    } else {
      return console.log(`Error. ${this.name} is not alive`);
    }
  }
  
  store(msg, evnt, from, to) {
      let time = moment().format();
      let interaction = new Interaction(msg, evnt, from, to, time);
      this.interactions.add(interaction);
      return this.interactions;
  }

  decide(method, data) {
    switch (method) {
      case 'topsis':
        const result = topsis.getBest(data.m, data.w, data.ia);
        return result;
        break;
        case 'ahp':
        const result = ahp.getWeights(data.c);
        return result;
        break;
    }
  }



} // END AGENT

module.exports = Agent, Interaction;
