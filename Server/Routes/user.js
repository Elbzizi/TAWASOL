const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../Modules/user");
const bcrypt = require("bcryptjs");

router.post(
  "/",
  check("name", "Name is required").notEmpty(),
  check("email", "Invalid email").isEmail(),
  check("password", "Password must be between 6 and 12 characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: { msg: "user alredy exist !!!" } });
      } else {
        const salt = bcrypt.genSalt(10);
        user = new User({
          name,
          email,
          password,
        });
        user.save();
      }
    } catch (error) {
      return;
    }
  }
);

module.exports = router;
