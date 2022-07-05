const router = require('express').Router();
const { auth } = require('../../middlewear/auth');
const profileController = require('./controller/profile');
const endPoint = require('./user.endPoint');
const validators = require('./user.validation');
const validation = require('../../middlewear/validation');
const { myMulter, multerValidators, multerPath, HME } = require('../../services/multer');

// profile
router.get('/profile', validation(validators.displayProfile), auth(endPoint.displayProfile), profileController.displayProfile);

// Upload one picture    
router.patch('/profile/pic', auth(endPoint.displayProfile),
    // ('users/profile/pic',['image/jpeg', 'image/jpg', 'image/png'])  'image' postman key
    myMulter(multerPath.profilePic, multerValidators.image).single('image'), HME,
    profileController.profilePic);

// Upload many pictures                                                                  
router.patch('/profile/cover', auth(endPoint.displayProfile),
    //  ('users/profile/cov',['image/jpeg', 'image/jpg', 'image/png'])  'image' postman key and max image number  
    myMulter(multerPath.coverPic, multerValidators.image).array('image', 5), HME,
    profileController.coverPic);

// update password
router.patch('/profile/password', validation(validators.updatePassword), auth(endPoint.displayProfile), profileController.updatePassword);

module.exports = router;