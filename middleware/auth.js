const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = require("../utils/config");
const UnauthorizedError = require("../errors/unauthorize-error")


const authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token,  NODE_ENV === "production" ? JWT_SECRET : 'dev-key');
  } catch (err) {
    return next(new UnauthorizedError("Invalid Token"));
  }

  req.user = payload;

  return next();
};

module.exports = { authorize };