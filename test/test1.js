import { expect } from "chai";
import { Matrix } from "../src/Matrix.js";

describe('Matrix', () => {
  describe('Constructor', () => {
    it('should initialize with the provided data', () => {
      const data = [[1, 2], [3, 4]];
      const matrix = new Matrix(data);
      expect(matrix.toArray()).to.deep.equal(data);
    });
  });

  describe('zeros', () => {
    it('should create a matrix of zeros', () => {
      const matrix = Matrix.zeros(2, 3);
      const expected = [[0, 0, 0], [0, 0, 0]];
      expect(matrix.toArray()).to.deep.equal(expected);
    });
  });

  describe('identity', () => {
    it('should create an identity matrix', () => {
      const matrix = Matrix.identity(3);
      const expected = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ];
      expect(matrix.toArray()).to.deep.equal(expected);
    });
  });

  describe('transpose', () => {
    it('should transpose a matrix', () => {
      const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
      const transposed = matrix.transpose();
      const expected = [[1, 4], [2, 5], [3, 6]];
      expect(transposed.toArray()).to.deep.equal(expected);
    });
  });

  describe('add', () => {
    it('should add two matrices', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[5, 6], [7, 8]]);
      const result = matrixA.add(matrixB);
      const expected = [[6, 8], [10, 12]];
      expect(result.toArray()).to.deep.equal(expected);
    });

    it('should throw an error when dimensions do not match', () => {
      const matrixA = new Matrix([[1, 2]]);
      const matrixB = new Matrix([[1], [2]]);
      expect(() => matrixA.add(matrixB)).to.throw(Error, 'Matrices must have the same dimensions');
    });
  });

  describe('subtract', () => {
    it('should subtract two matrices', () => {
      const matrixA = new Matrix([[5, 6], [7, 8]]);
      const matrixB = new Matrix([[1, 2], [3, 4]]);
      const result = matrixA.subtract(matrixB);
      const expected = [[4, 4], [4, 4]];
      expect(result.toArray()).to.deep.equal(expected);
    });

    it('should throw an error when dimensions do not match', () => {
      const matrixA = new Matrix([[1, 2]]);
      const matrixB = new Matrix([[1], [2]]);
      expect(() => matrixA.subtract(matrixB)).to.throw(Error, 'Matrices must have the same dimensions');
    });
  });

  describe('multiply', () => {
    it('should multiply two matrices', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[5, 6], [7, 8]]);
      const result = matrixA.multiply(matrixB);
      const expected = [[19, 22], [43, 50]];
      expect(result.toArray()).to.deep.equal(expected);
    });

    it('should throw an error when dimensions do not match for multiplication', () => {
      const matrixA = new Matrix([[1, 2, 3]]);
      const matrixB = new Matrix([[1], [2]]);
      expect(() => matrixA.multiply(matrixB)).to.throw(Error, 'Number of columns in the first matrix must equal number of rows in the second');
    });
  });

  describe('equals', () => {
    it('should return true for equal matrices', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[1, 2], [3, 4]]);
      expect(matrixA.equals(matrixB)).to.be.true;
    });

    it('should return false for unequal matrices', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[1, 2], [4, 3]]);
      expect(matrixA.equals(matrixB)).to.be.false;
    });

    it('should return false for matrices of different dimensions', () => {
      const matrixA = new Matrix([[1, 2]]);
      const matrixB = new Matrix([[1], [2]]);
      expect(matrixA.equals(matrixB)).to.be.false;
    });
  });

  describe('toString', () => {
    it('should return a string representation of the matrix', () => {
      const matrix = new Matrix([[1, 2], [3, 4]]);
      const result = matrix.toString();
      const expected = '1 2\n3 4';
      expect(result).to.equal(expected);
    });
  });
});
