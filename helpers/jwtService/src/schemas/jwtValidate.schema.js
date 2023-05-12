const yup = require("yup");
require('yup-jwt');

const jwtValidate = yup.object().shape({
    token: yup.string().jwt("decode")
});

module.exports = jwtValidate;