var express = require("express"),
  multer = require("multer"),
  fs = require("fs"),
  path = require("path"),
  router = express.Router();

var RateLimit = require("express-rate-limit");

var uploadLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 upload requests per windowMs
});

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
router.post("/upload/", uploadLimiter, upload.any(), function (req, res) {
  var uploadRoot = "../html/uploads/";
  var tempPath = req.files[0].path;
  var resolvedUploadRoot = path.resolve(uploadRoot);
  var resolvedTempPath = path.resolve(tempPath);

  // Ensure that the temporary upload path is actually within the intended upload root
  if (resolvedTempPath !== resolvedUploadRoot && !resolvedTempPath.startsWith(resolvedUploadRoot + path.sep)) {
    console.error("Rejected file move from unexpected temp path: %s", tempPath);
    if (!res.headersSent) {
      res.status(400).end();
    }
    return;
  }

  var tempName = path.basename(resolvedTempPath);
  var safeOriginalName = path.basename(req.files[0].originalname || "");
  var safeNewPath = path.join(uploadRoot, tempName + "_" + safeOriginalName);

  fs.rename(resolvedTempPath, safeNewPath, function (err) {
    if (err) {
      console.error("Error moving uploaded file from %s to %s: %s", resolvedTempPath, safeNewPath, err && err.message ? err.message : err);
      if (!res.headersSent) {
        res.status(500);
        res.end();
      }
      return;
    }

    res.type("json");
    const link = safeNewPath.replace("../html/", "");
    res.json({ link, type: req.files[0].mimetype });
    res.end();
  });
});
module.exports = router;
