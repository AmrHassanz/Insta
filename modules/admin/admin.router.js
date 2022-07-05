const router = require('express').Router();
const { auth } = require('../../middlewear/auth');
const endPoint = require('./admin.endPoint');
const adminController = require('./controller/admin');

// get all users
router.get('/users', auth(endPoint.getAllUsers), adminController.getAllUsers);

// change user role
router.patch('/user/:id/role', auth(endPoint.changeRole), adminController.changeRole);

// block user
router.patch('/user/:id/block', auth(endPoint.blockUser), adminController.blockUser);

// get invoice
router.get('/invoice', auth(endPoint.getAllUsers), adminController.invoice);


module.exports = router;