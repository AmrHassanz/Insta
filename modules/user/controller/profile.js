const bcrypt = require("bcryptjs/dist/bcrypt");
const userModel = require("../../../DB/model/User");

// get user profile
const displayProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.status(200).json({ message: 'Done', user });
    } catch (error) {
        res.status(500).json({ message: 'Catch error', error });
    }
}

// update profile picture
const profilePic = async (req, res) => {
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid file format" });
        } else {
            console.log(req.file);
            // {fieldname: 'image',originalname: '1.jpg',encoding: '7bit',mimetype: 'image/jpeg'}

            // (1) fixed url
            // const imageURL = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;

            // (2) base url , like MovieDB (prefered)
            const imageURL = `${req.finalDistination}/${req.file.filename}`;
            console.log(req.finalDistination); // uploads/users/profile/pic
            console.log(req.file.filename);    // bSxCJwv8CbJP8Gwj6xDyZ_1.jpg
            //    baseurl  = http://localhost:3000/
            //    imageURL = uploads/users/profile/pic/xAQy64UJp7Gq64R2OTnG__1.jpg   
            const user = await userModel.findByIdAndUpdate(req.user._id, { profilePic: imageURL }, { new: true });
            res.status(200).json({ message: "Done", user });
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error });
    }
}

// update profile cover
const coverPic = async (req, res) => {
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid file format" });
        } else {
            console.log({ req: req.files });
            /* [
                {fieldname: 'image',originalname: '1.jpg',encoding: '7bit',mimetype: 'image/jpeg'},
                {fieldname: 'image',originalname: '2.jpg',encoding: '7bit',mimetype: 'image/jpeg'}
            ] */
            const imagesURL = [];
            req.files.forEach(file => {
                imagesURL.push(`${req.finalDistination}/${file.filename}`);
            })
            const user = await userModel.findOneAndUpdate({ _id: req.user._id }, { coverPic: imagesURL }, { new: true });
            res.status(200).json({ message: "Done", user });
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error });
    }
};

// update password
const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (oldPassword === newPassword) {
            res.status(409).json({ message: 'sorry u have to make new one' });
        }
        else {
            const user = await userModel.findById(req.user._id);
            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) {
                res.status(400).json({ message: 'in-valid old password' });
            }
            else {
                const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRound));
                await userModel.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true });
                res.status(200).json({ message: 'Done' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Catch error', error });
    }
}



module.exports = {
    displayProfile, profilePic, coverPic, updatePassword
};