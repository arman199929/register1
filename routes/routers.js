const express = require('express');
const {body} = require("express-validator");
const mainController = require('../controller/mainController')
const homeController = require('../controller/registerController.js');
const loginController = require('../controller/loginController.js');
const adminController = require('../controller/adminController');
const session = require('express-session');
const depositController = require('../controller/depositController.js')
const homeRouter = express.Router();

homeRouter.get('/', mainController.main)
/** Register routers **/
homeRouter.post('/register',
    body('full_name').isLength({min: 6}),
    body('username').isLength({min: 8}),
    body('phone').isInt(),
    body('whatsapp').isInt(),
    homeController.register);
homeRouter.get('/register', homeController.regMode);

/** Login routers**/
homeRouter.get('/login', loginController.login);
homeRouter.post('/login/page', loginController.doLogin);

homeRouter.get('/deposit',depositController.doDeposit)
/**Admin router settings**/
homeRouter.get('/admin', adminController.adminLogin);
homeRouter.post('/admin/log', adminController.showUsers);
homeRouter.get('/dashboard', adminController.adminParams);
homeRouter.post('/admin/delete', adminController.deleteUser)
homeRouter.get('/admin/edit/:id', adminController.editUsers)
homeRouter.post('/admin/update', adminController.update);
/**Sign out**/
homeRouter.post('/signout', adminController.sign_out,
    loginController.sign_out)



module.exports = homeRouter;