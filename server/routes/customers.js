const { Router } = require("express");
const Customer = require("../models/Customer");
const router = Router();

router.post("/add-customer", async (req, res) => {
  try {
    const newCustomer= new Customer({
      CustomerID: req.body.CustomerID,
      CustomerName: req.body.CustomerName,
      CustomerEmail: req.body.CustomerEmail,
      ProjectName: req.body.ProjectName,
      Status: req.body.Status,
      StatusBg: req.body.StatusBg,
      Weeks: req.body.Weeks,
      Budget: req.body.Budget,
      Location: req.body.Location,
      CustomerImage: req.body.CustomerImage,
    });
    const customer = await newCustomer.save();
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all-customers", async (req, res) => {
  const allCustomers = await Customer.find();
  return res.send(allCustomers);
});

router.delete("/:_id", async (req, res) => {
  // console.log(req.params);
  const deleteCustomer = await Customer.deleteOne({ _id: req.params._id });
  return res.send(deleteCustomer);
});

module.exports = router;
