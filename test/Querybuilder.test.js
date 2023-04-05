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

    describe('InsertBuilder', () => {
      describe('build', () => {
        it('generates a valid SQL statement for a User instance', () => {
          class User {
            constructor(firstName, lastName, email) {
              this.firstName = firstName;
              this.lastName = lastName;
              this.email = email;
            }
          }
          const user = new User();
          user.firstName = 'John';
          user.lastName = 'Doe';
          user.email = 'johndoe@example.com';

          const insertBuilder = new InsertBuilder(User, user);
          const insertStatement = insertBuilder.build();

          expect(insertStatement).toBe("INSERT INTO users (firstName, lastName, email) VALUES ('John', 'Doe', 'johndoe@example.com')");
        });

        it('generates a valid SQL statement for a Car instance', () => {
          class Car {
            constructor(make, model, year) {
              this.make = make;
              this.model = model;
              this.year = year;
            }
          }
          const car = new Car();
          car.make = 'Toyota';
          car.model = 'Camry';
          car.year = 2022;

          const insertBuilder = new InsertBuilder(Car, car);
          const insertStatement = insertBuilder.build();

          expect(insertStatement).toBe("INSERT INTO cars (make, model, year) VALUES ('Toyota', 'Camry', 2022)");
        });

        it('generates a valid SQL statement for an object with Date values', () => {
          class User {
            constructor(firstName, lastName, email) {
              this.firstName = firstName;
              this.lastName = lastName;
              this.email = email;
              this.birthdate = new Date();
            }
          }
          const data = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            birthdate: new Date('1990-01-01'),
          };

          const insertBuilder = new InsertBuilder(User, data);
          const insertStatement = insertBuilder.build();

          expect(insertStatement).toBe("INSERT INTO users (firstName, lastName, email, birthdate) VALUES ('John', 'Doe', 'johndoe@example.com', '1990-1-1')");
        });

        it('generates a valid SQL statement for an object with Boolean and Number values', () => {
          class Car {
            constructor(make, model, year) {
              this.make = make;
              this.model = model;
              this.year = year;
              this.isAvailable = false;
              this.price = 0;
            }
          }
          const data = {
            make: 'Toyota',
            model: 'Camry',
            year: 2022,
            isAvailable: true,
            price: 24999.99,
          };

          const insertBuilder = new InsertBuilder(Car, data);
          const insertStatement = insertBuilder.build();

          expect(insertStatement).toBe("INSERT INTO cars (make, model, year, isAvailable, price) VALUES ('Toyota', 'Camry', 2022, true, 24999.99)");
        });
      });
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
    describe('CreateBuilder', () => {
      describe('table', () => {
        it('should set the table name in the query', () => {
          const builder = new CreateBuilder();
          builder.table('users');
          expect(builder.query.table).toEqual('users');
        });
      });

      describe('build', () => {
        it('should generate a create table statement for the model class', () => {
          class User {
            constructor(firstName, lastName, email, age, isActive, createdAt) {
              this.firstName = firstName;
              this.lastName = lastName;
              this.email = email;
              this.age = age;
              this.isActive = isActive;
              this.createdAt = createdAt;
            }
          }

          const builder = new CreateBuilder(User);
          const expected = 'CREATE TABLE users (firstName VARCHAR(255), lastName VARCHAR(255), email VARCHAR(255), age INTEGER, isActive BOOLEAN, createdAt TIMESTAMP)';
          const result = builder.build();
          expect(result).toEqual(expected);
        });

        it('should use the table name from the query if specified', () => {
          class User {
            constructor(firstName, lastName, email, age, isActive, createdAt) {
              this.firstName = firstName;
              this.lastName = lastName;
              this.email = email;
              this.age = age;
              this.isActive = isActive;
              this.createdAt = createdAt;
            }
          }

          const builder = new CreateBuilder(User);
          builder.table('customers');
          const expected = 'CREATE TABLE customers (firstName VARCHAR(255), lastName VARCHAR(255), email VARCHAR(255), age INTEGER, isActive BOOLEAN, createdAt TIMESTAMP)';
          const result = builder.build();
          expect(result).toEqual(expected);
        });

        it('should use VARCHAR(255) as the default data type for unrecognized types', () => {
          class Product {
            constructor(name, price, isAvailable) {
              this.name = name;
              this.price = price;
              this.isAvailable = isAvailable;
            }
          }

          const builder = new CreateBuilder(Product);
          const expected = 'CREATE TABLE products (name VARCHAR(255), price VARCHAR(255), isAvailable VARCHAR(255))';
          const result = builder.build();
          expect(result).toEqual(expected);
        });
      });
    });
  });
});




