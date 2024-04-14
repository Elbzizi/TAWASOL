const express = require("express");
const { auth } = require("../utils");
const { check, validationResult } = require("express-validator");
const route = express.Router();
const normalize = require("normalize-url");
/*
path:api/profile/
methode pour ajouter prfile
*/
route.post(
  "/",
  auth,
  check("status", "status is required").isEmpty(),
  check("skills", "skills is required").isEmpty(),
  (req, res) => {
    const error = validationResult(req);
    if (error) {
      return res.status(400).json({ msg: error.array() });
    }
    const {
      website,
      skills,
      youTube,
      twitter,
      facebook,
      gitHub,
      instagram,
      linkedIn,
      ...rest
    } = req.body;
    const profile = {
      user: req.user.id,
      website:
        website && website !== ""
          ? normalize(website, { forceHttp: true })
          : "",
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill) => {
            skill.trim();
          }),
      ...rest,
    };
  }
);

module.exports = route;
