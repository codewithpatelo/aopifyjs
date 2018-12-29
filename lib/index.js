'use strict';
const uuid = require('uuid-v4');
const moment = require('moment');

class Agent {
  constructor() {
    this.id = uuid();
	this.stimuli = {};
    this.message = '';
  }
  start() {
    this.birthday = moment().format();
    return this;
  }
  kill() {
    this.deathday = moment().format();
    return this;
  }
  emit(msg) {
    this.message = 'Hello world';
    return this.message;
  }
}

module.exports = Agent;