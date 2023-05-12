const yup = require("yup");

const jwtCreate = yup.object().shape({
  payload: yup.object().shape({
    user_id: yup.string().required(),
    user_email: yup.string().required(),
    active: yup.boolean().required(),
  }),
});

module.exports = jwtCreate;