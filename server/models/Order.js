const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    OrderID: {
    type: Number,
    require: true,
  },
  CustomerName: {
    type: String,
    require: true,
  },
  TotalAmount: {
    type: Number,
    require: true,
  },
  OrderItems: {
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
    Location: {
        type: String,
        require: true,
    },
    
    ProductImage: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);