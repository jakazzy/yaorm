class CreateBuilder {
  constructor(modelClass) {
    this.modelClass = modelClass;
    this.query = {};
  }

  table(table) {
    this.query.table = table;
    return this;
  }

  build() {
    const { table } = this.query;
    const tableName = table || this.modelClass.name.toLowerCase();

    const columns = Object.getOwnPropertyNames(new this.modelClass())
      .filter((column) => column !== 'constructor')
      .map((column) => {
        const type = typeof new this.modelClass()[column];
        console.log(`type :${type}` )
        let dataType;
        switch (type) {
          case 'number':
            dataType = 'INTEGER';
            break;
          case 'boolean':
            dataType = 'BOOLEAN';
            break;
          case 'string':
            dataType = 'VARCHAR(255)';
            break;
          case 'object':
            if (new this.modelClass()[column] instanceof Date) {
              dataType = 'TIMESTAMP';
            } else {
              dataType = 'VARCHAR(255)';
            }
            break;
          default:
            dataType = 'VARCHAR(255)';
            break;
        }
        return `${column} ${dataType}`;
      })
      .join(', ');
    return `CREATE TABLE ${tableName} (${columns})`;
  }
}

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const createBuilder = new CreateBuilder(User);
const query = createBuilder.build();

module.exports = CreateBuilder;
