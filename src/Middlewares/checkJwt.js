const jwt = require("jsonwebtoken");
const config = require("../config");

const checkJwt = (req, res, next) => {
  // Get token from authorization headers
  const token = req.headers["authorization"];
  let jwtPayload;

  // validate the token and get data
  try {
    jwtPayload = jwt.verify(token?.split(" ")[1], config.jwt.secret, {
      complete: true,
      algorithms: ["HS256"],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    });
    req.token = jwtPayload;
  } catch (error) {
    res
      .status(401)
      .type("json")
      .send(JSON.stringify({ message: "Missing or invalid token" }));
    return; // exit the middlware function
  }

  // Call the next middleware or controller.
  next();
};

module.exports = checkJwt;
