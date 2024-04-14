const config = require("config");
const jwt = require("jsonwebtoken");
/* generate token  ========
return information user
path:api/users/
Privat */
const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ msg: "token indefiend, autorisation refusée " });
  }
  try {
    jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "token invalide, autorisation refusée " });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};
module.exports = { auth };
