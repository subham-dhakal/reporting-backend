const config = require("config");
const request = require("supertest");

const {
  connectToTestDatbase,
  resetDatabase,
  closeConnection,
} = require("../common");

const { report_token } = config.get("app");
const URL = config.get("app.url");

// SAMPLE DATA
const transactionAddPayload = {
  txHash: '0xb1fd1c14c9b9df1ad4af34dc67fe7e0d988ef410e83fd84e2d1d0428909d6d35',
  blockNumber : '2555',
  vendor : 'test-vendor',
  amount : 166,
  phone : "9847587789",
  ward : 5,
  timestamp : '',
  year : '2021',
  method : 'sms',
  mode : 'online',
};

let connection;
describe(" /transaction api test", function () {

// test.todo("pass empty test cases");

  beforeAll(async () => {
    connection = await connectToTestDatbase();
  });

  afterAll(async () => {
    await resetDatabase(connection);
    await closeConnection(connection);
  });



  it("Add transaction ", async () => {       

   // Transaction Adding Issues

    const token = report_token;
    const res_data  = await request(URL)
      .post("/api/v1/transactions")
      .set("report_token", token)
      .send(transactionAddPayload);

        const results =  res_data?.body.data;
        // console.log("add transaction result", results);
        // expect(results.id).toBe(projectAddPayload.id);
        // expect(results.name).toBe(projectAddPayload.name);
    });
 

});