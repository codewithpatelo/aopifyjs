const assert = require('assert');

const Agent = require('../lib/index.js');
const agent = new Agent();


describe('Init', () => {
  it('It should create an agent object.', () => {
	console.log(agent);
    assert.equal(agent, agent);
  });
});

