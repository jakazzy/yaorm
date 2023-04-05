class InsertBuilder {
  constructor(modelClass, data) {
    this.modelClass = modelClass;
    this.columns = [];
    this.values = [];
    this.data = data;
  }

  build() {
    const tableName = `${this.modelClass.name.toLowerCase()}s`;
    const columnNames = this.getColumnNames();
    const values = this.getValues();

    return `INSERT INTO ${tableName} (${columnNames}) VALUES (${values})`;
  }

  getColumnNames() {
    const columnNames = Object.getOwnPropertyNames(new this.modelClass())
      .filter((column) => column !== 'constructor');
    return columnNames.join(', ');
  }

  getValues() {
    const values = Object.getOwnPropertyNames(new this.modelClass())
      .filter((column) => column !== 'constructor')
      .map((column) => this.convertValue(this.data[column]));
    return values.join(', ');
  }

  convertValue(value) {
    if (typeof value === 'string') {
      return `'${value}'`;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      return value;
    } else if (value instanceof Date) {
      const year = value.getFullYear();
      const month = value.getMonth() + 1;
      const day = value.getDate();
      return `'${year}-${month}-${day}'`;
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        const arr = value.map(item => this.convertValue(item));
        return `[${arr.join(', ')}]`;
      } else {
        const keys = Object.keys(value);
        const columns = keys.map(key => `${key}`).join(', ');
        const nestedValues = keys.map(key => this.convertValue(value[key])).join(', ');
        return `(${columns}) VALUES (${nestedValues})`;
      }
    } else {
      return null;
    }
  }
}


module.exports = InsertBuilder;
