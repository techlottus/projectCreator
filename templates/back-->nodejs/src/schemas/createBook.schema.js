const yup = require("yup");

module.exports = yup.object().shape({
  title: yup.string().required(),
});