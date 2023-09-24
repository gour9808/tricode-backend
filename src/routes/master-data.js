const express = require("express");
const masterDataRouter = express.Router();
const categoriesMasterModel = require("../models/categories-master");

const isAuth = require("../middleware/middleware");

// POST master

masterDataRouter.post("/category-master", isAuth, async (req, res) => {
  console.log(req.body);
  let categoryMaster = new categoriesMasterModel(req.body);
  const existingCategory = await categoriesMasterModel.find({
    name: req.body.name,
  });
  console.log(existingCategory, "existingCategory");
  if (existingCategory.length) {
    return res.status(409).send({ message: "Already Exists" });
  }

  categoryMaster
    .save()
    .then((update) => {
      res.status(201).send({ message: "Created Successfully", data: update });
    })
    .catch((e) => {
      res.status(500).send({ message: "Creation Failed", error: e });
    });
});

// GET

masterDataRouter.get("/category-master", isAuth, async (req, res) => {
  let data = await categoriesMasterModel.find({});
  res.send({ data: data });
});

module.exports = masterDataRouter;
