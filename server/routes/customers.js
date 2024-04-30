const { Router } = require("express");
const Customer = require("../models/Customer");
const multer = require("multer");
const router = Router();

const base = "http://localhost:5000/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, String(Date.now() + ".png"));
  },
});

const upload = multer({ storage: storage });

router.post("/add-customer", upload.single("file"), async (req, res) => {
  console.log(req.file);
  try {
    console.log(req.file.path);
    let fixStr = req.file.path.toString();
    let result = fixStr.replace("\\", "/");
    const newCustomer = new Customer({
      CustomerID: 1015,
      CustomerName: "Nir Atias",
      CustomerEmail: "nirIai@gmail.com",
      ProjectName: "Elta System",
      Status: "Pending",
      StatusBg: "#FEC90F",
      Weeks: "25",
      Budget: "$24.5",
      Location: "Israel",
      CustomerImage: base + result,
    });
    const customer = await newCustomer.save();
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all-customers", async (req, res) => {
  console.log(req.file);
  const allCustomers = await Customer.find();
  return res.send(allCustomers);
});

router.delete("/:_id", async (req, res) => {
  console.log(req.params);
  const deleteCustomer = await Customer.deleteOne({ _id: req.params._id });
  return res.send(deleteCustomer);
});

module.exports = router;
