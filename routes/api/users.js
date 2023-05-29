const router = require('express').Router();

const ctrl = require('../../controllers/users');
const googleAuth = require('../../controllers/users/googleAuth');
const {
  validateBody,
  authenticate,
  passportConfig,
} = require('../../middlewares');
const {
  users: {
    validationEmailUser,
    validationLoginUser,
    validationRegistrationUser,
  },
} = require('../../models');

// Initialize Passport middleware
router.use(passportConfig.initialize());
router.use(passportConfig.session());

// standard authorization routers
router.post(
  '/register',
  validateBody(validationRegistrationUser),
  ctrl.register,
);
router.post('/login', validateBody(validationLoginUser), ctrl.login);
router.post('/login-with-token', ctrl.loginWithToken);

// GOOGLE authorization routers
router.get('/google', googleAuth.auth);
router.get('/google/callback', googleAuth.callback, googleAuth.successCallback);

// router for email verification
router.get('/verify/:verificationToken', ctrl.verifyEmail);

// resend email letter for verification
router.post(
  '/verify',
  validateBody(validationEmailUser),
  ctrl.resendVerifyEmail,
);

// route to get current user
router.get('/current', authenticate, ctrl.getCurrentUser);

// logout route
router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
