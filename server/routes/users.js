const { Router } = require("express");
const User = require("../models/User");

const router = Router();

router.post("/add-user", async (req, res) => {
  try {
    const newUser = new User({
      username: "Noa",
      age: 20,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all-users", async (req, res) => {
  const allUsers = await User.find();
  return res.send(allUsers);
});

module.exports = router;
