const mailer = require('src/utils')

const sendEmail = async (req, res, next) => {
  try {
    const { recipients, email_sender, subject, body } = req.body
    const attachments = []
    const files = req.files ? req.files.files : []
    if (files) {
      for (const file of files) {
        attachments.push({
          filename: file.name,
          content: file.data,
        })
      }
    }
    let emails = null
    if (Array.isArray(recipients)) {
      emails = recipients.join(', ')
    } else {
      emails = recipients
    }
    await mailer().sendMail({
      from: `Zeleri <${email_sender}>`,
      to: emails,
      subject: subject,
      html: body,
      attachments: attachments,
    })
    res.status(200).json({ message: 'Email enviado correctamente' })
  } catch (error) {
    next(error)
  }
}

module.exports = sendEmail