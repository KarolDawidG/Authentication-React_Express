const express = require("express");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");

const {REACT_APP_SECRET_KEY} = require('../../config/configENV');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const { token, inputVal } = req.body;

  try {
    
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${REACT_APP_SECRET_KEY}&response=${token}`
    );


    if (response.data.success) {
      res.send("Human 👨 👩");
    } else {
      res.status(403).send("Robot 🤖");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
   }
});

module.exports = router;

