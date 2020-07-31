import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if(!token) return res.status(401).send("No access");

  try {
    const verify = jwt.verify(token, process.env.TOKEN);
    req.user = verify;
    next();
  } catch (error) {
    res.status(400).send("Wrong token");
  }
}

module.exports.verifyToken = verifyToken;