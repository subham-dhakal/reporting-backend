const { AbstractController } = require("@rumsan/core/abstract");
const { EVENTS } = require("../../constants/appConstants");
const WSService = require("@rumsan/core/services/webSocket");
const { TransactionModel, BeneficiaryModel } = require("../models");
const { Op } = require("sequelize");

module.exports = class extends AbstractController {
  constructor(options) {
    super(options);
    options.listeners = {};
    this.table = TransactionModel;
    this.tblBeneficiaries = BeneficiaryModel;
  }

  registrations = {
    add: (req) => this.add(req.payload),
    list: (req) => this.list(),
  };

  async add(payload) {
    try {
      let transaction = await this.table.create(payload);
      const beneficiaries = await this.tblBeneficiaries.findOne({
        where: {
          phone: transaction.phone,
        },
        raw: true,
        nest: true,
      });

      transaction = JSON.parse(JSON.stringify(transaction));

      WSService.broadcast(
        {
          ...transaction,
          name: beneficiaries.name,
        },
        "rahat_claimed"
      );
    } catch (err) {
      console.log(err);
    }
  }

  async list() {
    const list = await this.table.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    const phonesList = list.map((item) => item.phone);
    const beneficiaryList = await this.tblBeneficiaries.findAll({
      where: {
        phone: {
          [Op.in]: phonesList,
        },
      },
      raw: true,
    });
    const beneficiaryMapped = list
      .map((list) =>
        beneficiaryList.map((benef) => {
          return {
            name: benef.name,
            ...list,
          };
        })
      )
      .flatMap((e) => e);

    return beneficiaryMapped;
  }
};
