class FindByBuilder {
  constructor(db) {
    this.db = db;
  }

  async findById(modelClass, id) {
    const tableName = modelClass.name.toLowerCase();
    const query = `SELECT * FROM ${tableName} WHERE id = ${id}`;
    const [result] = await this.db.query(query);
    if (!result) {
      throw new Error(`${modelClass.name} with id ${id} not found`);
    }
    return new modelClass(result);
  }

  async findByField(modelClass, fieldName, value) {
    const tableName = modelClass.name.toLowerCase();
    const query = `SELECT * FROM ${tableName} WHERE ${fieldName} = ${value}`;
    const [result] = await this.db.query(query);
    if (!result) {
      throw new Error(`${modelClass.name} with ${fieldName} ${value} not found`);
    }
    return new modelClass(result);
  }
}

module.exports = FindByBuilder;
