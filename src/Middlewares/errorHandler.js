const express = require("express");
const CustomError = require("../exceptions/customError");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (!(err instanceof CustomError)) {
    res.status(500).send(
      JSON.stringify({
        message: "Server error, please try again later",
      })
    );
  } else {
    const customError = err;
    // object to hold response
    let response = {
      message: customError.message,
    };
    //if custom error conatins additional Info add it to response
    if (customError.additionalInfo)
      response.additionalInfo = customError.additionalInfo;
    res.status(customError.status).type("json").send(JSON.stringify(response));
  }
};

module.exports = errorHandler;
