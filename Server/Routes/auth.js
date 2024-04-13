const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  check("name", "Name is required").notEmpty(),
  check("email", "Invalid email").isEmail(),
  check("password", "Password must be between 6 and 12 characters").isLength({min: 6}),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    res.send("Added data successfully");
  }
);

module.exports = router;
