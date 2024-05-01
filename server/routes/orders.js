const { Router } = require("express");
const Order = require("../models/Order");
const router = Router();

router.post("/add-order", async (req, res) => {
  try {
    const newOrder = new Order({
      OrderID: req.body.OrderID,
      CustomerName: req.body.CustomerName,
      Price: req.body.Price,
      OrderItems: req.body.OrderItems,
      Status: req.body.Status,
      StatusBg: req.body.StatusBg,
      Location: req.body.Location,
      ProductImage: req.body.ProductImage,
    });
    const order = await newOrder.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all-orders", async (req, res) => {
  const allOrders = await Order.find();
  return res.send(allOrders);
});

router.delete("/:_id", async (req, res) => {
  // console.log(req.params);
  const deleteOrder = await Order.deleteOne({ _id: req.params._id });
  return res.send(deleteOrder);
});

module.exports = router;
