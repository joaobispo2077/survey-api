import { sum } from '../src/example';

describe('Test example', () => {
  it('should be able to sum numbers', () => {
    const result = sum(2, 2);
    expect(result).toBe(4);
  });
});
