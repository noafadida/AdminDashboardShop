const { Router } = require("express");
const Employee = require("../models/Employee");
const router = Router();

router.post("/add-employee", async (req, res) => {
  try {
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
  const allEmployees = await Employee.find();
  return res.send(allEmployees);
});

router.delete("/:_id", async (req, res) => {
  const deleteEmployee = await Employee.deleteOne({ _id: req.params._id });
  return res.send(deleteEmployee);
});

module.exports = router;
