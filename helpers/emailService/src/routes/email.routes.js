const express = require("express");
const router = express.Router();

const { validateSchema } = require("src/middlewares");
const { emailSchema } = require("src/schemas");

const {  sendEmail } = require("src/controllers/email");

router.post("", validateSchema(emailSchema), sendEmail);

module.exports = router;