const express = require("express");
const app = express();
const port = 1000;
const cookieParser = require("cookie-parser");
const bp = require("body-parser");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static("public"));
app.listen(port, () => { // check if webapp is running properly
  console.log(`Webserver started at ${port}`);
});

require("./src/home")(app);
require("./src/search")(app);
require("./src/repls")(app);
require("./src/community")(app);