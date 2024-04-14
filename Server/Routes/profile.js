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
  check("status", "status is required").isEmpty(),
  check("skills", "skills is required").isEmpty(),
  async (req, res) => {
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
    const social = { youTube, twitter, facebook, gitHub, instagram, linkedIn };
    for (const key in social) {
      if (social[key] && social[key] !== "") {
        social[key] = normalize(social[key], { forceHttp: true });
      }
    }
    profile.social = social;

    try {
      let brofileObject = await Profiles.findOneAndUpdate(
        { user: req.user.id },
        { profile },
        { new: true, upsert: true }
        // new pour return la nouvelle data client;
        // upsert pour crée un profile de cette user en cas n'exist pas
      );
      return res.json({ brofileObject });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

module.exports = route;
