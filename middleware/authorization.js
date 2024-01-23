const { decode } = require("../utils/jwt");

function authorization(req, res, next) {
  const { authorization = null } = req.header;

  if (!authorization) {
    return res.status(403).send({ error: "No authorization header found" });
  }

  const token = authorization.split(" ")[1] ?? null;

  if (!token) {
    return res.status(403).send({ error: "Token not valid" });
  }

  let decode;
  try {
    decode = decode(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(403).send({ error: "Token not valid" });
  }

  req.user = decode;

  next();
}

module.exports = authorization;
