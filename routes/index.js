var express = require("express"),
  multer = require("multer"),
  fs = require("fs"),
  path = require("path"),
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
  var uploadRoot = "../html/uploads/";
  var tempPath = req.files[0].path;
  var tempName = path.basename(tempPath);
  var safeOriginalName = path.basename(req.files[0].originalname || "");
  var safeNewPath = path.join(uploadRoot, tempName + "_" + safeOriginalName);

  fs.rename(tempPath, safeNewPath, function (err) {
    if (err) throw err;
  });

  res.type("json");
  const link = safeNewPath.replace("../html/", "");
  res.json({ link, type: req.files[0].mimetype });
  res.end();
});
module.exports = router;
