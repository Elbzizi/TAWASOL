const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Users = require("../Modules/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
/*
récupérer les valeur de pody
validation request body
check cette user il ya existe dans labase de donnée
crybte le password de user
save cette user dans la base de donnée
utilise le jwt pour cree token id et return 
 */
/* register methode ========
ajouter new user en databae
path:api/users/register
public */
router.post(
  "/register",
  check("name", "Name is required").notEmpty(),
  check("email", "Invalid email").isEmail(),
  check("password", "Password must be between 6 and 12 characters").isLength({
    min: 6,
    max: 12,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: { msg: "User already exists!!!" } });
      } else {
        const salt = bcrypt.genSaltSync(10);
        newUser = new Users({
          name,
          email,
          password,
        });
        newUser.password = await bcrypt.hash(password, salt);
        user = await newUser.save();
        const payload = {
          user: { id: user._id },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: "5 day" },
          (err, token) => {
            if (err) {
              throw err;
            } else {
              res.json({ token });
            }
          }
        );
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: error.message });
    }
  }
);
/* login methode ========
login user en application
path:api/users/login
public */
router.post(
  "/login",
  check("email", "Invalid email").isEmail(),
  check("password", "Password must be between 6 and 12 characters").isLength({
    min: 6,
    max: 12,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: { msg: "email n'existe pas !!!!!!" } });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: { msg: "password incoreccte !!!!!!" } });
        }
        const payload = {
          user: { id: user._id },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: "5 day" },
          (err, token) => {
            if (err) {
              throw err;
            } else {
              res.json({ token });
            }
          }
        );
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: error.message });
    }
  }
);
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
router.get("/", auth, async (req, res) => {
  try {
    //  const user = await Users.findById(req.user.id).select("-password");
    const user = await Users.find({ _id: req.user.id }, { password: 0 });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});
module.exports = router;
