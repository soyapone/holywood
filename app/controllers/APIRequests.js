var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//  Article = mongoose.model('Article');
var _ = require('lodash');
var xmlify = require('xmlify');
var APIRequest = mongoose.model('APIRequest');


module.exports = function (app,mypassport) {
  app.use('/APIRequests', router);
  passport = mypassport;
};


/* GET home page. */
router.get('/', function(req, res, next) {
  APIRequest.find(function (err, Requests) {
    if (err) return next(err);
    // console.log('-----------------------',Procedurals);
    // console.log('los Procedurals',Procedurals);
    res.render('APIRequests', { title: "Lista de APIRequest", APIRequests: Requests  });
  });

});



/* GET home page. */
router.get('/:ID', function(req, res, next) {
  var ID = req.params.ID

  //var Procedural = _.find(Procedurals, function(o) { return o.ID === ID; });
  APIRequest.findOne({ _id: ID }, function (err, APIRequest) {
    if (err) return handleError(err);
    if (APIRequest){
      res.render('APIRequest', { title: "Página APIRequest de ".concat(APIRequest._id), APIRequest: APIRequest });
    } else {
      res.render('404', { title: "Página no encontrada"});
    }
  });
});

router.delete('/:ID', function(req, res, next) {
  var ID = req.params.ID;
  APIRequest.remove({ _id: ID }, function (err) {
    if (err) return handleError(err);
    // removed!
  });
  res.redirect('/APIRequests');
});


router.post('/removeall', function(req, res, next) {
  //var Procedural = _.find(Procedurals, function(o) { return o.ID === ID; });
  APIRequest.remove({ }, function (err) {
    if (err){
      console.log("Error deleting all the APIRequest. More info: "+err);
    }
  });

  res.redirect('/APIRequests');
});
