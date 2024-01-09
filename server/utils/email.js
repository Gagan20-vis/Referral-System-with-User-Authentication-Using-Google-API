const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})
const sendEmail = (email, html) => {
    try {
        transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject:'Verify Account',
            html: html,
        })
        console.log('email send successfully');
    } catch (error) {
        console.log(`ye he error = ${error.message}`)
    }
}
module.exports = sendEmail;