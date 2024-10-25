import { expect } from 'chai';
import sinon from 'sinon';
import { Matrix } from '../src/Matrix.js';

describe('Matrix Mock', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Matrix.solve() should return mock solution', () => {
    
    const matrix = new Matrix([[1, 2], [3, 4]]);
    sinon.stub(matrix, 'solve').returns([1,2,3])
    const result = matrix.solve();

    expect(result).to.deep.equal([1, 2, 3]);
  });

  it('Matrix.multiply() should return mock multiplication result', () => {
    const matrix = new Matrix([[1, 2], [3, 4]]);
    sinon.stub(matrix, 'multiply').returns([[1, 0], [0, 1]])
    const result = matrix.multiply([[5, 6], [7, 8]]);

    expect(result).to.deep.equal([[1, 0], [0, 1]]);
  });
});

