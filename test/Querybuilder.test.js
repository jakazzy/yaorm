const SelectBuilder = require("../query_builder/SelectBuilder");
const InsertBuilder = require("../query_builder/InsertBuilder");
const CreateBuilder = require("../query_builder/CreateBuilder");
const QueryBuilder = require("../query_builder/QueryBuilder");

describe("QueryBuilder", () => {
  describe("select", () => {
    it("should create and return a new SelectBuilder instance", () => {
      const queryBuilder = new QueryBuilder();
      const selectBuilder = queryBuilder.select();
      expect(selectBuilder).toBeInstanceOf(SelectBuilder);
    });
  });

  describe("insert", () => {
    it("should create and return a new InsertBuilder instance", () => {
      const queryBuilder = new QueryBuilder();
      const insertBuilder = queryBuilder.insert();
      expect(insertBuilder).toBeInstanceOf(InsertBuilder);
    });
  });

  describe("create", () => {
    it("should create and return a new CreateBuilder instance", () => {
      const queryBuilder = new QueryBuilder();
      const createBuilder = queryBuilder.create();
      expect(createBuilder).toBeInstanceOf(CreateBuilder);
    });
  });

  describe("build", () => {
    it("should return the correct query for a SelectBuilder instance", () => {
      const queryBuilder = new QueryBuilder();
      const selectBuilder = queryBuilder.select().select("*").from("users").where("id = 1").limit(10);
      const query = queryBuilder.build();
      expect(query).toBe("SELECT * FROM users WHERE id = 1 LIMIT 10");
    });

    it("should return the correct query for an InsertBuilder instance", () => {
      const queryBuilder = new QueryBuilder();
      const insertBuilder = queryBuilder.insert({ name: "John", email: "john@example.com" }).into("users");
      const query = queryBuilder.build();
      expect(query).toBe(`INSERT INTO users (name, email) VALUES ('John', 'john@example.com')`);
    });

    it("should return the correct query for a CreateBuilder instance with table name inferred from class name", () => {
      class User {
        constructor(id, name, email) {
          this.id = id;
          this.name = name;
          this.email = email;
          this.createdAt = new Date();
          this.updatedAt = new Date();
        }
      }

      const queryBuilder = new QueryBuilder();
      const createBuilder = queryBuilder.create(User).build();

      expect(createBuilder).toBe("CREATE TABLE user (id VARCHAR(255), name VARCHAR(255), email VARCHAR(255), createdAt TIMESTAMP, updatedAt TIMESTAMP)");
    });
  });
});
