const SelectBuilder = require("./SelectBuilder");
const InsertBuilder = require("./InsertBuilder");
const CreateBuilder = require("./CreateBuilder");
const FindByBuilder = require("./FindByBuilder");
const UpdateBuilder = require("./UpdateBuilder");
const RemoveBuilder = require("./RemoveBuilder");

class QueryBuilder {
  constructor() {
    this.query = {};
  }

  select() {
    this.selectBuilder = new SelectBuilder();
    return this.selectBuilder;
  }

  insert(model,data) {
    this.insertBuilder = new InsertBuilder(model,data);
    return this.insertBuilder;
  }

  create(model) {
    this.createBuilder = new CreateBuilder(model);
    return this.createBuilder;
  }

  findBy(db){
    this.findByBuilder = new FindByBuilder(db);
    return this.findByBuilder;
  }

  update(model){
    this.updateBuilder = new UpdateBuilder(model);
    return this.updateBuilder;
  }

  remove(model){
    this.removeBuilder = new RemoveBuilder(model);
    return this.removeBuilder;
  }

  build() {
    if (this.selectBuilder) {
      return this.selectBuilder.build();
    } else if (this.insertBuilder) {
      return this.insertBuilder.build();
    } else if (this.createBuilder) {
      return this.createBuilder.build();
    }
  }
}


module.exports = QueryBuilder;
