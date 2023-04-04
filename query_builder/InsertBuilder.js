class InsertBuilder {
  constructor(tableName) {
    this.tableName = tableName;
    this.columns = [];
    this.values = [];
  }

  column(columnName) {
    this.columns.push(columnName);
    return this;
  }

  values(rowValues) {
    this.values.push(rowValues);
    return this;
  }

  build() {
    const columns = this.columns.join(', ');
    const values = this.values.map(rowValues =>
      `(${rowValues.map(value => this.formatValue(value)).join(', ')})`
    ).join(', ');
    return `INSERT INTO ${this.tableName} (${columns}) VALUES ${values};`;
  }

  formatValue(value) {
    if (typeof value === 'string') {
      return `'${value}'`;
    } else if (value instanceof Date) {
      return `'${value.toISOString()}'`;
    } else {
      return value;
    }
  }
}

module.exports = InsertBuilder;
