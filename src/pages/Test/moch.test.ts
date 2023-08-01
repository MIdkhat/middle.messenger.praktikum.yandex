import { equal } from 'assert';
import mochh from './moch';

describe('Typescript usage suite', () => {
  it('should be able to execute a test', () => {
    equal(true, true);
  });
  it('should return expected string', () => {
    equal(mochh('incoming'), 'incoming-static');
  });
});
