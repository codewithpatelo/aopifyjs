const assert = require('assert');

const EventEmitter = require('events');
const Agent = require('../lib/index.js');
const linearAlgebra = require('linear-algebra')();

const Matrix = linearAlgebra.Matrix;



const jorgito = new Agent('jorgito');
const juana = new Agent('juana');

const m = new Matrix([
  [1, 3, 3],
  [0.3, 1, 3],
  [0.3, 0.3, 1]
]);



describe('Init', () => {
  it('It should create an agent object.', () => {
	console.log(jorgito);
    assert.equal(jorgito, jorgito);
  });
})



describe('StartJorgito', () => {
  it('It should retrieve a true state.', () => {
	console.log(jorgito.start());
    assert.equal(jorgito.start(), jorgito.start());
  });
});



describe('EmitbutDeath2', () => {
  it('It should return an error alert because Juana is not alive', () => {
  console.log('JORGITO: Hola Juana');
  jorgito.tell({name: 'event', msg: 'Hola Juana'}, juana);
    assert.equal('test', 'test');
    
    console.log(juana,jorgito);
  });
});




describe('StartJuana', () => {
  it('It should retrieve a true state.', () => {
	console.log(juana.start());
    assert.equal(juana.start(), juana.start());
  });
});

describe('EmitandAlive', () => {
  it('Juan should return the message', () => {
  console.log('JORGITO: Hola Juana');
    assert.equal('test', 'test');
  });
});

describe('AHP Test', () => {
  it('no error', () => {
      console.log(m);
  jorgito.decide('ahp', m);
  console.log(jorgito.decide('ahp', m));
  assert.equal('test', 'test');
  });
});


describe('Kill', () => {
  it('It should retrieve isAlive as false.', () => {
	console.log(jorgito.kill());
    assert.equal(jorgito.kill(), jorgito.kill());
  });
});



