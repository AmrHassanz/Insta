const sendEmail = require('../../../services/email');
const userModel = require("../../../DB/model/User");
const { createInvoice } = require('../../../services/createInvoice');
const path = require('path');

// get all users 
const getAllUsers = async (req, res) => {
    // get all users
    // const users = await userModel.find({});
    // get users except (Admin)
    // const users = await userModel.find({ role: { $ne: 'Admin' } });
    // get users except (Admin , User)
    // const users = await userModel.find({ role: { $nin: ['Admin', 'User'] } });
    // get users (Admin or age > 30)
    // const users = await userModel.find({ $or: [{ role: 'Admin' }, { age: { $gt: 30 } }] });
    // get users (Admin and age > 30)
    // const users = await userModel.find({ role: 'Admin', age: { $gt: 30 } });
    // get users (age >= 30)
    // const users = await userModel.find({ age: { $gte: 30 } });
    // get users (age <= 30)
    const users = await userModel.find({ age: { $lte: 30 } });
    res.status(200).json({ message: 'Done', users });
}

// update role
const changeRole = async (req, res) => {
    const { id } = req.params; // user id
    const { role } = req.body;

    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
    sendEmail(user.email, `<p>admin changed u role to ${user.role}</p>`);

    res.status(200).json({ message: 'Done', user });
}

// block user
const blockUser = async (req, res) => {
    const { id } = req.params; // user id

    const user = await userModel.findOne({ _id: id });
    if (user.role === req.user.role) {
        res.status(401).json({ message: 'sorry you cant block user with same role' });
    }
    else {
        await userModel.findByIdAndUpdate(user._id, { isBlocked: true }, { new: true });
        sendEmail(user.email, `<p>your account has been blocked plz contact with help to re-open your account</p>`);

        res.status(200).json({ message: 'Done' });
    }
}

// send invoice
const invoice = async (req, res) => {
    const users = await userModel.find({}).select('userName email age gender phone');
    // invoice
    const invoiceData = {
        shipping: {
            name: "John Doe",
            address: "1234 Main Street",
            city: "San Francisco",
            state: "CA",
            country: "US",
            postal_code: 94111
        },
        items: users,
        subtotal: 8000,
        paid: 0,
        invoice_nr: 1234
    };
    createInvoice(invoiceData, path.join(__dirname, '../../../uploads/PDF/allUsers.pdf'));
    res.json({ message: 'Done', link: req.protocol + '://' + req.headers.host + '/api/v1/admin/uploads/pdf/allUsers.pdf' });

    // sendEmail('3amr.7assan1993@gmail.com', `<p>plz check your invoice</p>`, [
    //     {
    //         path: path.join(__dirname, './uploads/PDF/invoice.pdf'),
    //         filename: 'invoice.pdf'
    //     },
    // ])

}


module.exports = { getAllUsers, changeRole, blockUser, invoice }