const express = require('express');
const  router = express.Router();
// every user have the user already saved in our database
const {read ,update} =require('../controllers/user')
const { requireSign,adminMiddleware} = require('../controllers/auth')



router.get('/user/:id',requireSign, read);
// adminMiddleware aalow only admin to update profile 

router.put('/admin/update', requireSign , update)

// adminMiddleware aalow only admin to update profile 
router.put('/user/update', requireSign , update)

module.exports = router;