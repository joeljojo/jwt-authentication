// const express = require("express");

// AsyncHandler wraps API routes, allowing async Error handling
// @param fn Function to call API endpoint
// @returns Promise with catch function with next wich propagates
// promise errors into an error handler

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
