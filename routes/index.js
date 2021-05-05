var express = require("express"),
  multer = require("multer"),
  fs = require("fs"),
  router = express.Router();
router.get("/", function (req, res, next) {
  res.render("/public/index.html", { title: "files" });
});
var upload = multer({
  dest: "../html/uploads/",
  limits: {
    files: 250,
    fileSize: 1 * 1024 * 1024 * 1024,
  },
});
router.post("/upload/", upload.any(), function (req, res) {
  var path = req.files[0].path;
  var pathNew = path + "_" + req.files[0].originalname;

  fs.rename(path, pathNew, function (err) {
    if (err) throw err;
  });

  res.type("json");
  const link = pathNew.replace("../html/", "");
  res.json({ link, type: req.files[0].mimetype });
  res.end();
});
module.exports = router;
