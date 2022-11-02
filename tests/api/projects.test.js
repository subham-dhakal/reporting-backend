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
const projectAddPayload = {
    id: "0x064e0f1cf92b93af161e42f60bc5cb1fac0a0cdb2d2727c274ce70f64f35dadq",
    name: "test",
    project_manager : "test-manager",
    location : 'bhaktapur',
    allocations : ["test"],
    financial_institutions : [{"name":"test-company-name"}],
}

let connection;
describe(" /projects api test", function () {
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

  it("Add Project ", async () => {
    const token = report_token;
   const res_data  = await request(URL)
      .post("/api/v1/projects")
      .set("report_token", token)
      .send(projectAddPayload);

        const results =  res_data?.body?.data;
        // console.log("add project result", results);
        expect(results.id).toBe(projectAddPayload.id);
        expect(results.name).toBe(projectAddPayload.name);
    });
 





});
