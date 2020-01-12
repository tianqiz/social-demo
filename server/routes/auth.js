const express = require('express'),
      router = express.Router(),
      { userSignupValidator, passwordResetValidator } = require('../validator')
      
const { signup, signin, logout,forgotPassword, resetPassword, socialLogin } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.post('/signup', userSignupValidator  ,signup)

router.post('/signin' ,signin)

router.get('/logout' , logout)

// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

// then use this route for social login
router.post("/social-login", socialLogin); 


// any route containing :userId, our app will first execute userByID()
router.param('userId', userById);
module.exports = router;