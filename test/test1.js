import { expect } from "chai";
import Mtrx from "mtrx";

function matricesCloseTo(matrixA, matrixB, delta) {
  expect(matrixA.length).to.equal(matrixB.length);
  for (let i = 0; i < matrixA.length; i++) {
    expect(matrixA[i].length).to.equal(matrixB[i].length);
    for (let j = 0; j < matrixA[i].length; j++) {
      expect(matrixA[i][j]).to.be.closeTo(matrixB[i][j], delta);
    }
  }
}

describe("Mtrx Library", function () {
  describe("Matrix Inversion", function () {
    it("should invert a 2x2 matrix", function () {
      const matrix = new Mtrx([
        [4, 7],
        [2, 6],
      ]);

      const expectedInverse = [
        [0.6, -0.7],
        [-0.2, 0.4],
      ];
      const result = matrix.inv();
      matricesCloseTo(result, expectedInverse, 0.0001);
    });

    it("should invert a 3x3 matrix", function () {
      const matrix = new Mtrx([
        [1, 2, 3],
        [0, 1, 4],
        [5, 6, 0],
      ]);
      const expectedInverse = [
        [-24, 18, 5],
        [20, -15, -4],
        [-5, 4, 1],
      ];
      const result = matrix.inv();
      matricesCloseTo(result, expectedInverse, 0.0001);
    });

    it("should throw an error for non-square matrices", function () {
      const nonSquareMatrix = new Mtrx([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
      expect(() => nonSquareMatrix.inv()).to.throw(
        Error,
        nonSquareMatrix + " is not a Square matrix"
      );
    });

    it("should throw an error for singular matrices", function () {
      const singularMatrix = new Mtrx([
        [1, 2],
        [2, 4],
      ]);
      expect(() => singularMatrix.inv()).to.throw(
        Error,
        singularMatrix + "is a Singular matrix"
      );
    });
  });

  describe("Zeros Function", function () {
    it("should create a 2x2 matrix of zeros", function () {
      const matrix = Mtrx.zeros(2, 2);
      expect(matrix).to.deep.equal([
        [0, 0],
        [0, 0],
      ]);
    });

    it("should create a 3x4 matrix of zeros", function () {
      const matrix = Mtrx.zeros(3, 4);
      expect(matrix).to.deep.equal([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]);
    });
  });

  describe("Determinant Calculation", function () {
    it("should calculate the determinant of a 2x2 matrix", function () {
      const matrix = new Mtrx([
        [1, 2],
        [3, 4],
      ]);
      expect(matrix.det).to.equal(-2);
    });
  });

  describe("Transpose Function", function () {
    it("should transpose a 2x3 matrix", function () {
      const matrix = new Mtrx([
        [1, 2, 3],
        [4, 5, 6],
      ]);
      const transposed = matrix.T();
      expect(transposed).to.deep.equal([
        [1, 4],
        [2, 5],
        [3, 6],
      ]);
    });

    it("should transpose a 3x2 matrix", function () {
      const matrix = new Mtrx([
        [1, 4],
        [2, 5],
        [3, 6],
      ]);
      const transposed = matrix.T();
      expect(transposed).to.deep.equal([
        [1, 2, 3],
        [4, 5, 6],
      ]);
    });
  });
});
