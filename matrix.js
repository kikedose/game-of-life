class LifeGenerator {
  constructor(rows, columns) {
    for (let x = 1; x <= rows; x++) {
      this[x] = {};
      for (let y = 1; y <= columns; y++){
        this[x][y] = Math.floor(Math.random() * 2);
      }
    }

    this.rows = rows;
    this.columns = columns;
  }

  value(x, y) {
    return this[x][y];
  }

  surrounding(x, y) {
    let surrounding = [];

    surrounding.push(
      this[x][y - 1],
      this[x][y + 1],
      this[x - 1]?.[y - 1],
      this[x - 1]?.[y],
      this[x - 1]?.[y + 1],
      this[x + 1]?.[y - 1],
      this[x + 1]?.[y],
      this[x + 1]?.[y + 1],
    );

    surrounding = surrounding.filter(Boolean);
    surrounding = surrounding.length ? surrounding.reduce((previous, current) => previous + current) : [0];
    return surrounding;
  }

  next() {
    for (let x = 1; x <= this.rows; x++ ) {
      for (let y = 1; y <= this.columns; y++ ) {
        const surrounding = this.surrounding(x, y);

        if (this[x][y]) {
          if (surrounding !== 2 || surrounding !== 3) {
            this[x][y] = 0;
            continue;
          }
        } else if (surrounding === 3) {
          this[x][y] = 1;
        }
      }
    }
  }
}

const myMatrix = new LifeGenerator(5, 5);
console.table(myMatrix);
// myMatrix.next();
// console.table(myMatrix);
