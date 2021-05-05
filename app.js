var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var routes = require("./routes/index");
var app = express();

app.use(favicon(__dirname + "/public/favicon.ico"));
app.set("view engine", "html");
app.set("views", __dirname);
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

app.use(function (req, res, next) {
  console.log(req);
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

var server = app.listen(4000, function () {
  var port = server.address().port;
  console.info("files app working dir", __dirname);
  console.info("files app listening at http://localhost:%s", port);
});

module.exports = app;
