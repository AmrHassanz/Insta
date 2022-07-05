require('dotenv').config();
const sendEmail = require('./services/email');
const express = require('express');
// 1
// const cors = require('cors')

// cron 1
// const schedule = require('node-schedule');

const connectDB = require('./DB/connection');
const app = express();
const port = process.env.PORT;
const indexRouter = require('./modules/index.router');
const path = require('path');

// 2 (domains that can use the backend)
// var whitelist = ['http://example1.com', 'http://localhost:3000']
// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.includes(origin)) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }
// 3
// app.use(cors(corsOptions));
app.use(express.json());

//         base url
app.use('/api/v1/auth', indexRouter.authRouter);
app.use('/api/v1/user', indexRouter.userRouter);
app.use('/api/v1/post', indexRouter.postRouter);
app.use('/api/v1/admin', indexRouter.adminRouter);
app.use('/api/v1/uploads', express.static(path.join(__dirname, './uploads')));

// QR Code
const QRCode = require('qrcode');
app.get('/', (req, res) => {
    QRCode.toDataURL('I am a pony!', function (err, url) {
        if (err) {
            res.status(400).json({ message: 'QR error', err });
        } else {
            console.log(url);
            res.json({ message: 'QR', url });
        }
    })
})

// invoice
// const invoice = {
//     shipping: {
//         name: "John Doe",
//         address: "1234 Main Street",
//         city: "San Francisco",
//         state: "CA",
//         country: "US",
//         postal_code: 94111
//     },
//     items: [
//         {
//             UserName: "Amr Hassan",
//             Email: "3amr.7assan1993@gmail.com",
//             Age: 28,
//             Gender: "Male",
//             Phone: "01027179463"
//         },
//         {
//             UserName: "Menna Hassan",
//             Email: "eman.a7med1996@gmail.com",
//             Age: 22,
//             Gender: "Female",
//             Phone: "0102666463"
//         }
//     ],
//     subtotal: 8000,
//     paid: 0,
//     invoice_nr: 1234
// };
// createInvoice(invoice, path.join(__dirname, './uploads/PDF/invoice.pdf'));
// sendEmail('3amr.7assan1993@gmail.com', `<p>plz check your invoice</p>`, [
//     {
//         path: path.join(__dirname, './uploads/PDF/invoice.pdf'),
//         filename: 'invoice.pdf'
//     },
// ])

// cron 2
// const job = schedule.scheduleJob('20 * * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

connectDB();
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});