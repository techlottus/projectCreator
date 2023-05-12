const express = require("express");
const router = express.Router();

const emailRouter = require("src/routes/email.routes");

router.use("/email", emailRouter);

module.exports = router;