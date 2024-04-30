const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
