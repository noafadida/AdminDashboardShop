const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users.js");
const employeesRoutes = require("./routes/employees.js");
const customersRoutes = require("./routes/customers.js");
const fileRoutes = require("./routes/files.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("./uploads", express.static("uploads"));

const connectionString =
  "mongodb+srv://noa:5LQHCHDEFPrpOs62@cluster0.0tqwho9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Connect To DB
mongoose.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use("/api/users", usersRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  // console.log(req.params.filename);
  res.sendFile(
    `C:/Users/noafadida/Documents/GitHub/ReactAdminDashboardApp/my-react-app/server/uploads/${filename}`
  );
});

app.listen(5000, () => {
  console.log(`Backend server is running on port 5000 !`);
});
