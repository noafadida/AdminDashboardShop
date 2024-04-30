const { Router } = require("express");
const Employee = require("../models/Employee");
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

router.post("/add-employee", async (req, res) => {
  // console.log(req);
  try {
    // console.log(req.file.path);
    // let fixStr = req.file.path.toString();
    // let result = fixStr.replace("\\", "/");

    const newEmployee = new Employee({
      EmployeeID: req.body.EmployeeID,
      Name: req.body.Name,
      Title: req.body.Title,
      HireDate: req.body.HireDate,
      Country: req.body.Country,
      ReportsTo: req.body.ReportsTo,
      EmployeeImage: req.body.EmployeeImage,
    });
    const employee = await newEmployee.save();
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all-employees", async (req, res) => {
  // console.log(req.file);
  const allEmployees = await Employee.find();
  return res.send(allEmployees);
});

router.delete("/:_id", async (req, res) => {
  // console.log(req.params);
  const deleteEmployee = await Employee.deleteOne({ _id: req.params._id });
  return res.send(deleteEmployee);
});

module.exports = router;
