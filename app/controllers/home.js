var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
//Article = mongoose.model('Article'),
xmlify = require('xmlify'),
util = require('util'),
passport = require('passport');


module.exports = function (app,mypassport) {
  app.use('/', router);
  passport = mypassport;
};


router.get('/', function (req, res, next) {
  res.render('indexTest', {
    title: 'WOODCALC - Specialists in wood joint calculations [BETA]'
  });
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};


//*********
//Rutas para el perfil
//*******

router.get('/profile', isLoggedIn, function(req,res){
  res.render('profile.ejs', {user:req.user, title:"Profile page."});
});

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});
