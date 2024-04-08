const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'kuolearnaws@gmail.com',
        pass: process.env.SMPT_GMAIL_PASS,
    },
});

router.post('/', (req, res, next) => {
    const { to, subject, body } = req.body;
    // TODO : add server side validation

    const mailOptions = {
        from: 'kuolearnaws@gmail.com',
        to,
        subject,
        text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).send({ error: `Error in sending email ${error}` })
        } else {
            res.send({ success: `Email sent: ${info.response}` })
        }
    })
})

module.exports = router;


