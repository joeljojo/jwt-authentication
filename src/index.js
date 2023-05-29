const express = require("express");
const config = require("./config/index");
require("dotenv").config();

// instatntiate express object.
const app = express();

// Date() without any parameter returns same result as Date.now()
const date = new Date(Date());

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} at ${date.toString()}`);
});
