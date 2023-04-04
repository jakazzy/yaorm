class UpdateBuilder {
  constructor(modelClass) {
    this.modelClass = modelClass;
    this.query = {};
  }

  table(table) {
    this.query.table = table;
    return this;
  }

  set(key, value) {
    if (!this.query.set) {
      this.query.set = {};
    }
    this.query.set[key] = value;
    return this;
  }

  where(key, value) {
    if (!this.query.where) {
      this.query.where = {};
    }
    this.query.where[key] = value;
    return this;
  }

  build() {
    const { table } = this.query;
    const tableName = table || this.modelClass.name.toLowerCase();
    const setClause = Object.entries(this.query.set)
      .map(([key, value]) => `${key}='${value}'`)
      .join(', ');
    const whereClause = Object.entries(this.query.where)
      .map(([key, value]) => `${key}='${value}'`)
      .join(' AND ');
    return `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
  }
}

module.exports = UpdateBuilder;
