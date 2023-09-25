const express = require("express");
const dealsDataRouter = express.Router();
const dealModel = require("../models/deal-model");

const isAuth = require("../middleware/middleware");

// POST master

dealsDataRouter.post("/deal",  async (req, res) => {
  console.log(req.body);
  let deal = new dealModel(req.body);

  deal
    .save()
    .then((update) => {
      res.status(201).send({ message: "Created Successfully", data: update });
    })
    .catch((e) => {
      res.status(500).send({ message: "Creation Failed", error: e });
    });
});

// GET

expensesDataRouter.get("/deals",  async (req, res) => {
  let data = await expensesModel.find({  });
  res.send({ data: data });
});

module.exports = dealDataRouter;
