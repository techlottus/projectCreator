const yup = require('yup')

module.exports = yup.object().shape({
  email_sender: yup.string().email().required(),
  recipients: yup.lazy((value) => {
    switch (typeof value) {
      case 'array':
        return yup.array().required() // schema for array
      case 'string':
        return yup.string().required() // schema for string
      default:
        return yup.mixed().required()
    }
  }),
  subject: yup.string().required(),
  body: yup.string().required(),
})