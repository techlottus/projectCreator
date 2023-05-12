require("dotenv").config();

const request = require('supertest')
const app = require('src/app')

describe('EMAIL SEND', () => {
  
  process.env.MAIL_CONNECTION="smtp"
  process.env.SMTPPORT=587
  process.env.SMTPHOST="email-smtp.us-east-1.amazonaws.com"
  process.env.MAIL_USERNAME="AKIA2SMEK5MX7OXTVMES"
  process.env.MAIL_PASSWORD="BDyCSAcZUCWiiQv3aXPbHpkuuqF4hNfFH7bbzozgL6Lk"

  it('EMAIL SEND SUCCESS', async () => {
    const body = {
      recipients: ['jooswebs@gmail.com'],
      email_sender: 'soporte@zeleri.com',
      subject: 'eso',
      body: 'index.html',
    }
    const response = await request(app).post('/api/email').send(body)
    const response_status = response["status"];
    expect(response_status).toEqual(200);

  })

  it('EMAIL SEND FAIL', async () => {
    const body = {}
    const response = await request(app).post('/api/email').send(body)
    const response_status = response["status"];
    expect(response_status).toEqual(400);

  })
})