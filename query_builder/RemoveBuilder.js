class RemoveBuilder {
  constructor(modelClass) {
    this.modelClass = modelClass;
    this.query = {};
  }

  from(table) {
    this.query.table = table;
    return this;
  }

  where(conditions) {
    this.query.conditions = conditions;
    return this;
  }

  build() {
    const { table } = this.query;
    const tableName = table || this.modelClass.name.toLowerCase();
    const { conditions } = this.query;

    let query = `DELETE FROM ${tableName}`;

    if (conditions) {
      const whereClause = Object.keys(conditions)
        .map((key) => `${key} = ${JSON.stringify(conditions[key])}`)
        .join(' AND ');
      query += ` WHERE ${whereClause}`;
    }

    return query;
  }
}
module.exports = RemoveBuilder;
