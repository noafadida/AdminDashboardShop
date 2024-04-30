const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  EmployeeID: {
    type: Number,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  Title: {
    type: String,
    require: true,
  },
  HireDate: {
    type: String,
    require: true,
  },
  Country: {
    type: String,
    require: true,
  },
  ReportsTo: {
    type: String,
    require: true,
  },
  EmployeeImage: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
