const nodemailer = require('nodemailer');

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    // let data = { subject, message, send_to, sent_from }

    // let host = process.env.EMAIL_HOST;
    // let user = process.env.EMAIL_USER;
    // let pass = process.env.EMAIL_PASS;
    // console.log("EMAIL_HOST", host);
    // console.log("EMAIL_USER", user);
    // console.log("EMAIL_PASS", pass);

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 527,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    console.log('transport   : ', transport.host);

    //email info
    const options = {
        from: sent_from,
        replyTo: reply_to,
        html: message,
        subject: subject,
        to: send_to
    }

    //send email 
    transport.sendMail(options, function (err, info) {
        console.log('error', err);
        console.log('info', info);

        if (err) {
            console.log(err);
        }
        console.log(info);
    })
}

module.exports = sendEmail;