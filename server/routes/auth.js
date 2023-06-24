const express = require('express');
const  router = express.Router();

//controller
const {signup , accountActivation, signin ,forgetPassword ,resetPassword} =require('../controllers/auth')

// router.get('/signup' ,signup)

//import validators - arry of cheks
const {userSignupValidator,userSigninValidator ,forgetPasswordValidator,resetPasswordValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

router.post('/signup' ,userSignupValidator ,runValidation,signup)
router.post('/account-activation',accountActivation);
router.post('/signin', userSigninValidator,runValidation,signin);


router.put('/forget-password', forgetPasswordValidator ,runValidation ,forgetPassword)
router.put('/reset-password', resetPasswordValidator ,runValidation , resetPassword)

module.exports = router;