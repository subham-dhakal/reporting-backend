const { db } = require("../jest.setup");
const BeneficiaryController = require("../../modules/beneficiary/beneficiary.controller");
const beneficiaryC = new BeneficiaryController({ db });

const BeneficiaryToBeCreated = {
  id: "0x064e0f1cf92b93af161e42f60bc5cb1fac0a0cdb2d2727c274ce70f64f35dadf",
  name: "Kelli Rempel",
  wallet_address: "0x6e18753B910F2FD118f3E0A69c18F31DD81995A5",
  gender: "M",
  phone: "9814719844",
  age: 41,
  child: 2,
  group: "G",
};

const BeneficiaryToBeUpdated = {
  name: "Kelli Rempel Update",
  wallet_address: "0x6e18753B910F2FD118f3E0A69c18F31DD81995A6",
  gender: "F",
  phone: "9814719844",
  age: 41,
  child: 2,
  group: "G",
};

const BulkAdd = [
  {
    id: "0x064e0f1cf92b93af161e42f60bc5cb1fac0a0cdb2d2727c274ce70f64f35dads",
    name: "test Rempel",
    walletAddress: "0x6e18753B910F2FD118f3E0A69c18F31DD81995A6",
    gender: "F",
    phone: "9814719874",
    age: 41,
    child: 2,
    group: "G",
  },
  {
    id: "0x064e0f1cf92b93af161e42f60bc5cb1fac0a0cdb2d2727c274ce70f64f35dadq",
    name: "test Rempel",
    walletAddress: "0x6e18753B910F2FD118f3E0A69c18F31DD81995A1",
    gender: "M",
    phone: "9814719074",
    age: 41,
    child: 2,
    group: "B",
  },

  {
    id: "0x064e0f1cf92b93af161e42f60bc5cb1fac0a0cdb2d2727c274ce70f64f35dadz",
    name: "test Rempel test",
    walletAddress: "0x6e18753B910F2FD118f3E0A69c18F31DD81995A2",
    gender: "M",
    phone: "9814719004",
    age: 47,
    child: 1,
    group: "B",
  },
];

describe("Beneficiary Controller Test Cases", () => {
  it("should create a new Beneficiary", async () => {
    const beneficiary = await beneficiaryC.add(BeneficiaryToBeCreated);
    expect(beneficiary.id).toBe(BeneficiaryToBeCreated.id);
    expect(beneficiary.name).toBe(BeneficiaryToBeCreated.name);
  });

  it("should bulk add Beneficiary", async () => {
    const beneficiary = await beneficiaryC.bulkAdd(BulkAdd);
    // console.log(beneficiary);
    // console.log(beneficiary[1]);
    // const {dataValues} = beneficiary;
    // console.log(dataValues);
    // console.log(dataValues);
    // console.log(dataValues);
    // expect(results[0].name).toBe(BulkAdd[0].name);
  });

  it("should get by ID", async () => {
    const beneficiary = await beneficiaryC.getById(BeneficiaryToBeCreated.id);
    // console.log(beneficiary);
    // console.log(beneficiary[1]);
    // const {dataValues} = beneficiary;
    // console.log(dataValues);
    // console.log(dataValues);
    // console.log(dataValues);
    // expect(results[0].name).toBe(BulkAdd[0].name);
  });

  it("should count by Group", async () => {
    const beneficiary = await beneficiaryC.getBeneficiaryCountByGroup();
    // expect(beneficiary[0].count).toBe('2');
    const data = beneficiary[0].dataValues;
    // console.log(data);
    expect(data.count).toBe('2');
  });

});
