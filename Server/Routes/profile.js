const express = require("express");
const { auth } = require("../utils");
const { check, validationResult } = require("express-validator");
const route = express.Router();
const normalize = require("normalize-url");
const Profiles = require("../Modules/profile");
/*
path:api/profile/
methode pour ajouter prfile
*/
route.post(
  "/",
  auth,
  check("status", "status is required").notEmpty(),
  check("skills", "skills is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
    const socialFields = {
      youTube,
      twitter,
      facebook,
      gitHub,
      instagram,
      linkedIn,
    };
    for (let key in socialFields) {
      const value = socialFields[key];
      if (value && value != "") {
        socialFields[key] = normalizeUrl(value, { forceHttps: true });
      }
    }

    profile.social = socialFields;
    try {
      let brofileObject = await Profiles.findOneAndUpdate(
        { user: req.user.id },
        { $set: profile },
        { new: true, upsert: true }
        // new pour return la nouvelle data client;
        // upsert pour crée un profile de cette user en cas n'exist pas
      );
      return res.json({ brofileObject });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

module.exports = route;
