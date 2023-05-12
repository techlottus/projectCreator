const express = require("express");
const router = express.Router();

const jwtRouter = require("src/routes/routes");

router.use("/jwt", jwtRouter);

module.exports = router;