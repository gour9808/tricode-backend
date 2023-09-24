const express = require("express");
const router = express.Router();
const userModal = require("./../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/middleware");

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const User = new userModal(req.body);
  const existingUser = await userModal.find({ email: req.body.email });
  console.log(existingUser, "exixting");
  if (existingUser.length) {
    return res.status(409).send({ message: "Email Already Exists" });
  }
  User.password = await bcrypt.hash(req.body.password, 12);
  User.save()
    .then((u) => {
      console.log(u);
      res.status(201).send(u);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

router.get("/users", async (req, res) => {
  console.log(req.query);

  let totalItems = await userModal.countDocuments();
  const perPage = req.query.page;
  const currentPage = req.query.curentPage;
  const columnName = req.query.columnName;
  console.log(columnName);
  const sortBy = {
    [columnName]: req.query.sortBy,
  };
  console.log(sortBy);
  let data = await userModal
    .find({})
    .limit(+perPage)
    .skip((currentPage - 1) * perPage)
    .sort(sortBy)
    .then((data) => {
      res.send({ totalItems, data });
    });
});

router.patch("/user/:id", isAuth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await userModal.findById(req.params.id);
    updates.forEach((elem) => (user[elem] = req.body[elem]));
    user.save();

    if (!user) {
      return res.status(404).send("No user with id");
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  console.log(req.body);
  const user = await userModal.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    return res.status(400).send({ message: "No User found" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).send();
  }

  const token = jwt.sign({ email: user.email, id: user._id }, "secret", {
    expiresIn: 3600,
  });

  res.send({ token, user });
});

module.exports = router;
