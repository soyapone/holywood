var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article'),
xmlify = require('xmlify'),
util = require('util'),
passport = require('passport');



module.exports = function (app,mypassport) {
  app.use('/auth', router);
  passport = mypassport;
};

//****************************
// Rutas para la autentificación
//****************************

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook',
passport.authenticate('facebook', { scope: [ 'email' ] })
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/profile',
failureRedirect: '/' }));


// Rutas de google
router.get('/google',
passport.authenticate('google', { scope: ['profile', 'email' ] })
);

// Ruta de google (callback)
router.get('/google/callback',
passport.authenticate('google', { successRedirect: '/profile', failureRedirect: '/' }));
