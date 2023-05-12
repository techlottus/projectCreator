const nodemailer = require("nodemailer")

const mailer = () => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: process.env.SMTPPORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, 
      pass: process.env.MAIL_PASSWORD, 
    },
  });

  return transporter

}

module.exports = mailer