const rateLimit = require("express-rate-limit");

 const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again later.',
});

module.exports = limiter;
