const express = require("express");
const config = require("./config");
const db = require("./models");
require("dotenv").config();
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

// instatntiate express object.
const app = express();

app.use(express.json());

//database
db.sequelize.sync();

// Date() without any parameter returns same result as Date.now()
const date = new Date(Date());
// Add routes object before app.listen call
app.use("/" + "api", routes);

// Add errorHandling middleware just before the app.listen call
// this will ensure that all errors are handled
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} at ${date.toString()}`);
});
