const { Router } = require("express");
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

router.post("/add-file", upload.single("file"), async (req, res) => {
  try {
    // console.log(req.file.path);
    let fixStr = req.file.path.toString();
    let result = fixStr.replace("\\", "/");
    const newUrl = base + result;
    res.status(200).json(newUrl);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
