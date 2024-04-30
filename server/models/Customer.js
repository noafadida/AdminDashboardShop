const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    CustomerID: {
    type: Number,
    require: true,
  },
  CustomerName: {
    type: String,
    require: true,
  },
  CustomerEmail: {
    type: String,
    require: true,
  },
  ProjectName: {
    type: String,
    require: true,
  },
  Status: {
    type: String,
    require: true,
  },
  StatusBg: {
    type: String,
    require: true,
    },
    Weeks: {
        type: String,
        require: true,
    },
    Budget: {
        type: String,
        require: true,
    },
    Location: {
        type: String,
        require: true,
    },
    
    CustomerImage: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
