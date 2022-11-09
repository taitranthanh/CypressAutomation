import MasterPage from "../../pages/booking/MasterPage";

describe("PostgesDB", function () {
  const masterPage = new MasterPage();

  // it.only("Test create database on postgresDb", ()=> {
  //     cy.task("DATABASE", {
  //         dbConfig: Cypress.env("DB"),
  //         sql: `
  //         CREATE DATABASE testDB;
  //         `
  //       }).then((result) => {
  //         console.log(result.rows)
  //       });
  // })

  it("Test create a table on PostgresDB", () => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
        CREATE TABLE Persons (ID int NOT NULL, FirstName varchar(255), Address varchar(255), City varchar(255), PRIMARY KEY (ID))  
        `,
    }).then((result) => {
      console.log(result.rows);
    });
  });

  it("Test insert a row into a table on PostgresDB", () => {
    cy.task("DATABASE", {
        dbConfig: Cypress.env("DB"),
      sql: `INSERT INTO persons values ( '05', 'Automation Test05', '264 Cong Hoa Street', 'HCM')`
    }).then((result) => {
        expect(result.rowCount).to.equal(1);
    });
  });

  it("Test insert multiple rows into a table on PostgresDB", function () {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `INSERT INTO persons values ( '02', 'Automation Test02', '264 Cong Hoa Street', 'HCM'),
        ( '03', 'Automation Test03', '264 Cong Hoa Street', 'HCM')`,
    }).then((result) => {
      expect(result.rowCount).to.equal(2);
    });
  });

  it("Test query a record on PostgresDB", function () {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
        SELECT * FROM persons WHERE id=02
        `,
    }).then((result) => {
      expect(result.rows[0].id).to.equal(2);
      expect(result.rows[0].firstname).to.equal("Automation Test02");
      expect(result.rows[0].address).to.equal("264 Cong Hoa Street");
      expect(result.rows[0].city).to.equal("HCM");
    });
  });

  it("Test update row into a table on PostgresDB", () => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `UPDATE persons SET firstname='Automation updated' WHERE id=02`,
    }).then((result) => {
      expect(result.rowCount).to.equal(1);
    });
  });

  it("Test delete a record on PostgresDB", () => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
        Delete from persons where id = '01'
        `,
    }).then((result) => {
      console.log(result.rows);
    });

    masterPage.verifyPersonIdIsDeleted("01");
  });

  it("Test delete a table on PostgresDB", () => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
      DROP TABLE persons
      `,
    }).then((result) => {
      console.log(result.rows);
    });
  });
});

// Testing for MYSQL

describe("MYSQL", function () {
  const mysqlDbName = "mysql";

  it("Test create a table", () => {
    cy.task("queryDatabase", {
      dbName: mysqlDbName,
      query: `
CREATE TABLE Persons (ID int NOT NULL, FirstName varchar(255), Address varchar(255), City varchar(255), PRIMARY KEY (ID))  
`,
    }).then((result) => {
      console.log(result.rows);
    });
  });

  it("Test insert a row into a table", () => {
    cy.task("queryDatabase", {
      dbName: mysqlDbName,
      query: `INSERT INTO Persons values ( '01', 'Automation Test01', '264 Cong Hoa Street', 'HCM')`,
    }).then((result) => {
        expect(result.affectedRows).to.eq(1);
    });
  });

  it("Test insert multiples rows into a table", () => {
    cy.task("queryDatabase", {
      dbName: mysqlDbName,
      query: `INSERT INTO Persons values ( '02', 'Automation Test02', '264 Cong Hoa Street', 'HCM'), ( '03', 'Automation Test03', '264 Cong Hoa Street', 'HCM')`,
    }).then((result) => {
        expect(result.affectedRows).to.eq(2);
    });
  });

  it("Test query record with ID", () => {
    cy.task("queryDatabase", {
      dbName: mysqlDbName,
      query: `SELECT * FROM Persons WHERE ID = 01`,
    }).then((result) => {
      expect(result[0].ID).to.eq(1);
      expect(result[0].FirstName).to.eq("Automation Test01");
      expect(result[0].Address).to.eq("264 Cong Hoa Street");
      expect(result[0].City).to.eq("HCM");
    });
  });

  it("Test update a record with ID", () => {
    cy.task("queryDatabase", {
      dbName: mysqlDbName,
      query: `UPDATE Persons SET FirstName="Testing Updated" WHERE ID=01`,
    }).then((result) => {
      expect(result.affectedRows).to.eq(1);
    });
  });

  it("Test delete a record with ID", () => {
    cy.task("queryDatabase", {
      dbName: mysqlDbName,
      query: `DELETE FROM Persons WHERE ID=02`,
    }).then((result) => {
      expect(result.affectedRows).to.eq(1);
    });
  });

  it("Test DROP a table with ID", () => {
    cy.task("queryDatabase", {
      dbName: mysqlDbName,
      query: `DROP TABLE Persons`,
    }).then((result) => {
        console.log(result);
    });
  });
});
