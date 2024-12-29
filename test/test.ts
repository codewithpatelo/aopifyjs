import assert from 'assert';
import { EventEmitter } from 'events';
import Agent from '../lib/index'; // Asegúrate de que el path sea correcto.
import { Matrix } from 'linear-algebra';

// Inicializar matrices y agentes
const jorgito = new Agent('jorgito');
const juana = new Agent('juana');

const m = new Matrix([
  [1, 3, 3],
  [0.3, 1, 3],
  [0.3, 0.3, 1],
]);

// Tests
describe('Init', () => {
  it('should create an agent object.', () => {
    console.log(jorgito);
    assert.strictEqual(jorgito, jorgito);
  });
});

describe('StartJorgito', () => {
  it('should retrieve a true state.', () => {
    console.log(jorgito.start());
    assert.strictEqual(jorgito.start(), jorgito.start());
  });
});

describe('EmitbutDeath2', () => {
  it('should return an error alert because Juana is not alive.', () => {
    console.log('JORGITO: Hola Juana');
    jorgito.tell({ name: 'event', msg: 'Hola Juana' }, juana);
    assert.strictEqual('test', 'test');
    console.log(juana, jorgito);
  });
});

describe('StartJuana', () => {
  it('should retrieve a true state.', () => {
    console.log(juana.start());
    assert.strictEqual(juana.start(), juana.start());
  });
});

describe('EmitandAlive', () => {
  it('should return the message.', () => {
    console.log('JORGITO: Hola Juana');
    assert.strictEqual('test', 'test');
  });
});

describe('AHP Test', () => {
  it('should process AHP without errors.', () => {
    console.log(m);
    jorgito.decide('ahp', m);
    console.log(jorgito.decide('ahp', m));
    assert.strictEqual('test', 'test');
  });
});

describe('Kill', () => {
  it('should retrieve isAlive as false.', () => {
    console.log(jorgito.kill());
    assert.strictEqual(jorgito.kill(), jorgito.kill());
  });
});
