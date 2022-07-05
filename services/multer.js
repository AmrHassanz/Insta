const multer = require('multer'); // import multer (third party module)
const path = require('path');     // built in module
const { nanoid } = require('nanoid'); // import nanoid (third party module)
const fs = require('fs'); // (9) file system (built in module)
const multerPath = {
    profilePic: 'users/profile/pic',
    coverPic: 'users/profile/cov',
    post:'/post'
}
const multerValidators = {
    image: ['image/jpeg', 'image/jpg', 'image/png'],
    pdf: ['application/pdf']
}

// handle multer error (middleware)
const HME = (err, req, res, next) => {
    if (err) {
        res.status(400).json({ message: 'multer error', err })
    }
    else {
        next();
    }
}


function myMulter(customPath, customValidator) {
    // customPath      =  multerPath.profilePic  = 'users/profile/pic'
    // customValidator =  multerValidators.image = ['image/jpeg', 'image/jpg', 'image/png'] 

    // (1) check if (users/profile/pic) exists or not
    if (!customPath || customPath == null) {
        customPath = 'general';
    }
    // (2) get image full path
    const fullPath = path.join(__dirname, `../uploads/${customPath}`);
    console.log({ __dirname }); // D:\\09 Web Development\\06 Route\\Session\\02 Back End\\Session 14\\Elwan\\amr\\services
    console.log({ fullPath });  // D:\\09 Web Development\\06 Route\\Session\\02 Back End\\Session 14\\Elwan\\amr\\uploads\\users\\profile\\pic

    // (3) if path does not exist , create it
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
    // (4) storage = file destination , file name
    const storage = multer.diskStorage({
        // (4-1)
        destination: function (req, file, cb) {
            // destination
            console.log({ file: file });
            // file: {fieldname: 'image',originalname: '1.jpg',encoding: '7bit',mimetype: 'image/jpeg'}
            req.finalDistination = `uploads/${customPath}`;
            cb(null, fullPath); // cb(error,destination)
            // file destination (D:\\09 Web Development\\06 Route\\Session\\02 Back End\\Session 14\\Elwan\\amr\\uploads\\users\\profile\\pic)
        },
        // (4-2)
        filename: function (req, file, cb) {
            // name
            cb(null, nanoid() + '_' + file.originalname);
            // file name (KO-Nzv-EOxfBXZ7_3aMV7_1.jpg)
        }
    })
    // (5) accept only file extension i select
    const fileFilter = function (req, file, cb) {
        // ['image/jpeg', 'image/jpg', 'image/png'].includes('image/jpeg')
        if (customValidator.includes(file.mimetype)) {
            cb(null, true);
        } else {
            req.fileErr = true; //  to tell user 'in-valid file format'
            cb(null, false);
        }
    }
    // (6) upload file
    const upload = multer({ dest: fullPath, limits: { fileSize: 625000 }, fileFilter, storage });
    // (7) return statement
    return upload;
}
// (8) export module
module.exports = { myMulter, multerValidators, multerPath, HME };
