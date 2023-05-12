const app = require("src/app");
const swaggerUi = require("swagger-ui-express");
const swaggerJwt = require("documentation/swaggerJwt");

const PORT = process.env.PORT || 3001;

app.use("/api-jwt", swaggerUi.serve, swaggerUi.setup(swaggerJwt));

app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});