const express = require("express");
const multer = require("multer");
const Model = require("./modelSchema");

const router = express.Router();

// Multer configuration for file uploads
const upload = multer({ dest: "uploads/" });

router.post(
  "/register",
  upload.fields([{ name: "photo" }, { name: "certificate" }]),
  async (req, res) => {
    try {
      const { name, email, phone, age, gender, experience, password } = req.body;

      const newModel = new Model({
        name,
        email,
        phone,
        age,
        gender,
        experience,
        password,
        photo: req.files["photo"][0].path,
        certificate: req.files["certificate"][0].path,
      });

      await newModel.save();
      res.status(201).send({ message: "Model registered successfully" });
    } catch (error) {
      res.status(500).send({ error: "Failed to register model" });
    }
  }
);

module.exports = router;
