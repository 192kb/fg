var express = require("express"),
  multer = require("multer"),
  fs = require("fs"),
  router = express.Router();
router.get("/", function (req, res, next) {
  res.render("/public/index.html", { title: "files" });
});
var upload = multer({
<<<<<<< HEAD
  dest: "../html/uploads/",
=======
  dest: "../../html/uploads/",
>>>>>>> 5a6a8f2edb2d246ba4659034e325af7820000321
  limits: {
    files: 250,
    fileSize: 1 * 1024 * 1024 * 1024,
  },
});
<<<<<<< HEAD
router.post("/upload/", upload.any(), function (req, res) {
  var path = req.files[0].path;
  var pathNew = path + "_" + req.files[0].originalname;
  console.debug(req.files[0]);

  fs.rename(path, pathNew, function (err) {
    if (err) throw err;
  });

  res.type("json");
  const link = pathNew.replace("../html/", "");
=======
router.post("/files/upload/", upload.any(), function (req, res) {
  var path = req.files[0].path;
  var pathNew = path + "." + req.files[0].originalname.split(".").pop();
  console.log(pathNew);
  switch (req.files[0].mimetype) {
    default:
      fs.rename(path, pathNew, function (err) {
        if (err) throw err;
      });
      break;
  }

  res.type("json");
  const link = pathNew.replace("../../html/", "");
>>>>>>> 5a6a8f2edb2d246ba4659034e325af7820000321
  res.json({ link, type: req.files[0].mimetype });
  res.end();
});
module.exports = router;
