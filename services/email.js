const nodeoutlook = require('nodejs-nodemailer-outlook');
function sendEmail(dest, message, attachment) {
    try {
        if (!attachment) {
            attachment = [];
        }
        nodeoutlook.sendEmail({
            auth: {
                user: process.env.senderEmail,
                pass: process.env.senderPassword
            },
            // auth email or sub email
            from: process.env.senderEmail,
            to: dest,
            subject: 'Hey you, awesome!',
            html: message,
            text: 'This is text version!',
            attachments: attachment,
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
        }
        );
    } catch (error) {
        console.log(`catch error ${error}`);
    }
}

// const sgMail = require('@sendgrid/mail');
// function sendEmail(dest, message) {
//     try {
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const msg = {
//             to: dest,
//             from: process.env.senderEmail, // Use the email address or domain you verified above
//             subject: 'Sending with Twilio SendGrid is Fun',
//             text: 'and easy to do anywhere, even with Node.js',
//             html: message,
//         };
//         //ES8
//         (async () => {
//             try {
//                 await sgMail.send(msg);
//             } catch (error) {
//                 console.error(error);
//                 if (error.response) {
//                     console.error(error.response.body)
//                 }
//             }
//         })();
//     } catch (error) {
//         console.log(`catch error ${error}`);
//     }
// }

module.exports = sendEmail;