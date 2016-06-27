var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
var User = require('../app/models/user.js');
var configAuth = require('./auth');

module.exports = function (passport){

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err,user);
    });
  });

  // Configuración de estrategia para facebook
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    passReqToCallback: true,
    profileFields: [ 'email' , 'name' ]
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      if(!req.user){
        User.findOne({'facebook.id': profile.id}, function(err, user){
          if(err)
          return done(err);
          if(user){
            if(!user.facebook.token){
              user.facebook.token = accessToken;
              user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
              user.facebook.email = profile.emails[0].value;
              user.save(function(err){
                if (err)
                throw err;
              });
            }
            return done(null,user);
          }
          else {
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;
            newUser.save(function(err){
              if (err)
              throw err;
              return done(null,newUser);
            });
          }
        });

      }

    });
  }
));

// Configuración de estrategia para google

passport.use(new GoogleStrategy({
  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  callbackURL: configAuth.googleAuth.callbackURL,
  passReqToCallback: true,
  profileFields: [ 'email' , 'name' ]
},
function(req, accessToken, refreshToken, profile, done) {
  process.nextTick(function(){
    if(!req.user){
      User.findOne({'google.id': profile.id}, function(err, user){
        if(err)
        return done(err);
        if(user){
          if(!user.google.token){
            user.google.token = accessToken;
            user.google.name = profile.displayName;
            user.google.email = profile.emails[0].value;
            user.save(function(err){
              if (err)
              throw err;
            });
          }
          return done(null,user);
        }
        else {
          var newUser = new User();
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;
          newUser.save(function(err){
            if (err)
            throw err;
            return done(null,newUser);
          });
        }
      });

    }

  });
}
));


// passport.use(new GoogleStrategy({
//   clientID: configAuth.googleAuth.clientID,
//   clientSecret: configAuth.googleAuth.clientSecret,
//   callbackURL: configAuth.googleAuth.callbackURL
// },
// function(accessToken, refreshToken, profile, done) {
//   process.nextTick(function(){
//     User.findOne({'google.id': profile.id}, function(err, user){
//       if(err)
//       return done(err);
//       if(user)
//       return done(null, user);
//       else {
//         var newUser = new User();
//         newUser.google.id = profile.id;
//         newUser.google.token = accessToken;
//         newUser.google.name = profile.displayName;
//         newUser.google.email = profile.emails[0].value;
//         newUser.save(function(err){
//           if (err)
//           throw err;
//           return done(null,newUser);
//         });
//       }
//     });
//   });
// }
// ));

};
