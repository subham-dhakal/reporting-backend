const config = require("config");
const request = require("supertest");

const {
  connectToTestDatbase,
  resetDatabase,
  closeConnection,
} = require("../common");

const { report_token } = config.get("app");
const URL = config.get("app.url");


const vendorPayload = {
    id : '123',
    name : 'test-vendor',
    gender : 'M',
    phone : '9814784789',
    wallet_address : '0x6e18753B910F2FD118f3E0A69c18F31DD81995A6',
    govt_id : '456',
    agencies : [{name : 'agency1'}],
  };
  
  let connection;
  describe(" /vendors api test", function () {
  
  test.todo("pass empty test cases");
  
    beforeAll(async () => {
      connection = await connectToTestDatbase();
    });
  
    // afterEach(async () => {
    //   await resetDatabase(connection);
    // });
  
    afterAll(async () => {
      await resetDatabase(connection);
      await closeConnection(connection);
    });


    it("Add vendors ", async () => {

        const token = report_token;
        const res_data  = await request(URL)
          .post("/api/v1/vendors")
          .set("report_token", token)
          .send(vendorPayload);
    
            const results =  res_data?.body.data;
            // console.log("add vendor result", results);
            expect(results.id).toBe(vendorPayload.id);
            expect(results.name).toBe(vendorPayload.name);
            expect(results.govt_id).toBe(vendorPayload.govt_id);
        });


    });