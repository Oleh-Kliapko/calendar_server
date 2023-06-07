const router = require('express').Router();

const ctrl = require('../../controllers/users');
const googleAuth = require('../../controllers/users/googleAuth');
const {
  validateBody,
  authenticate,
  isValidId,
  passportConfig,
  uploadCloud,
} = require('../../middlewares');
const {
  user: {
    validationEmailUser,
    validationLoginUser,
    validationRegistrationUser,
    validationCurrentUser,
    validationPasswordUser,
  },
} = require('../../models');

router.post(
  '/register',
  validateBody(validationRegistrationUser),
  ctrl.register,
);
router.post('/login', validateBody(validationLoginUser), ctrl.login);
router.post('/login-with-token', ctrl.loginWithToken);

// Initialize Passport middleware
router.use(passportConfig.initialize());
router.use(passportConfig.session());

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

router.get('/current', authenticate, ctrl.getCurrentUser);
router.get('/:id', isValidId, ctrl.getById);

router.patch(
  '/update',
  authenticate,
  validateBody(validationCurrentUser),
  uploadCloud.single('avatarURL'),
  ctrl.updateUser,
);

// forgot password

router.patch(
  '/getNewPassword',
  validateBody(validationEmailUser),
  ctrl.getNewPassword,
);

// create new password

router.patch(
  '/createNewPassword',
  authenticate,
  validateBody(validationPasswordUser),
  ctrl.createNewPassword,
);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
