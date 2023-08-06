import { expect } from 'chai';
import sinon from 'sinon';
import { Store } from './Store';

describe('Store', () => {
  let store;
  let emitSpy;
  let setSpy;
  let getSpy;
  const user = { id: 1, name: 'John' };
  beforeEach(() => {
    store = new Store();
    store.set('user', user);

    emitSpy = sinon.spy(store, 'emit');
    setSpy = sinon.spy(store, 'set');
    getSpy = sinon.spy(store, 'getState');
  });

  afterEach(() => {
    emitSpy.restore();
  });

  it('should set keypath and emit event', () => {
    const user = { id: 2, name: 'John' };
    store.set('user', user);
    expect(setSpy.withArgs('user', user).calledOnce).to.be.true;
    expect(emitSpy.withArgs('updated', store.getState()).calledOnce).to.be.true;
  });

  it('should get state', () => {
    const state = store.getState();
    expect(getSpy.withArgs().calledOnce).to.be.true;
    expect(state).to.deep.equal({ user });
  });
});
