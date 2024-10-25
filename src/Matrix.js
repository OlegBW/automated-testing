export class Matrix {
  constructor(data) {
    this.data = data;
  }

  static zeros(rows, cols) {
    return new Matrix(Array.from({ length: rows }, () => Array(cols).fill(0)));
  }

  static identity(size) {
    const data = Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (__, j) => (i === j ? 1 : 0))
    );
    return new Matrix(data);
  }

  transpose() {
    const transposedData = this.data[0].map((_, i) =>
      this.data.map((row) => row[i])
    );
    return new Matrix(transposedData);
  }

  toArray() {
    return this.data;
  }

  add(matrix) {
    this._checkDimensions(matrix);
    const result = this.data.map((row, i) =>
      row.map((value, j) => value + matrix.data[i][j])
    );
    return new Matrix(result);
  }

  subtract(matrix) {
    this._checkDimensions(matrix);
    const result = this.data.map((row, i) =>
      row.map((value, j) => value - matrix.data[i][j])
    );
    return new Matrix(result);
  }

  multiply(matrix) {
    if (this.data[0].length !== matrix.data.length) {
      throw new Error(
        "Number of columns in the first matrix must equal number of rows in the second"
      );
    }
    const result = Array.from({ length: this.data.length }, (_, i) =>
      Array.from({ length: matrix.data[0].length }, (_, j) =>
        this.data[i].reduce(
          (sum, value, k) => sum + value * matrix.data[k][j],
          0
        )
      )
    );
    return new Matrix(result);
  }

  equals(matrix) {
    if (
      this.data.length !== matrix.data.length ||
      this.data[0].length !== matrix.data[0].length
    ) {
      return false;
    }
    return this.data.every((row, i) =>
      row.every((value, j) => value === matrix.data[i][j])
    );
  }

  toString() {
    return this.data.map((row) => row.join(" ")).join("\n");
  }

  _checkDimensions(matrix) {
    if (
      this.data.length !== matrix.data.length ||
      this.data[0].length !== matrix.data[0].length
    ) {
      throw new Error("Matrices must have the same dimensions");
    }
  }

  solve() {
    const n = this.data.length;

    for (let i = 0; i < n; i++) {
      let maxEl = Math.abs(this.data[i][i]);
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(this.data[k][i]) > maxEl) {
          maxEl = Math.abs(this.data[k][i]);
          maxRow = k;
        }
      }

      for (let k = i; k < n + 1; k++) {
        const tmp = this.data[maxRow][k];
        this.data[maxRow][k] = this.data[i][k];
        this.data[i][k] = tmp;
      }

      for (let k = i + 1; k < n; k++) {
        const c = -this.data[k][i] / this.data[i][i];
        for (let j = i; j < n + 1; j++) {
          if (i === j) {
            this.data[k][j] = 0;
          } else {
            this.data[k][j] += c * this.data[i][j];
          }
        }
      }
    }
  }
}
