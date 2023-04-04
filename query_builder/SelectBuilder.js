class SelectBuilder {
  constructor() {
    this.query = {};
  }

  select(field) {
    this.query.select = field;
    return this;
  }

  from(table) {
    this.query.from = table;
    return this;
  }

  where(condition) {
    this.query.where = condition;
    return this;
  }

  limit(limit) {
    this.query.limit = limit;
    return this;
  }

  orderBy(field, order) {
    this.query.orderBy = {
      field,
      order,
    };
    return this;
  }

  get() {
    return this.query;
  }

  build() {
    const { select, from, where, orderBy, limit} = this.query;
    let sqlQuery = `SELECT ${select} FROM ${from}`;
    if (where) {
      sqlQuery += ` WHERE ${where}`;
    }
    if (orderBy) {
      sqlQuery += ` ORDER BY ${orderBy.field} ${orderBy.order}`;
    }
    if (limit) {
      sqlQuery += ` LIMIT ${(limit)}`;
    }
    return sqlQuery;
  }
}

module.exports = SelectBuilder;
