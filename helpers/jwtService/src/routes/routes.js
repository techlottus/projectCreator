const express = require("express");
const router = express.Router();

const { validateSchema } = require("src/middlewares");
const { jwtCreate, jwtValidate } = require("src/schemas");

const { create, validate } = require("src/controllers/jwt");

router.post("/", validateSchema(jwtCreate), create);
router.post("/validate", validateSchema(jwtValidate), validate);

module.exports = router;