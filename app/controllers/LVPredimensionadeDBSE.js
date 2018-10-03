var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article'),
xmlify = require('xmlify'),
StaticFunction = require('../statics/LVPredimensionadeDBSE'),
tabla = require('../statics/tables'),
validationErrors = require('../statics/validationErrors'),
util = require('util'),
passport = require('passport');

var ua = require('universal-analytics');
var visitor = ua('UA-80763829-1');

var db = require('../statics/APIRequests_db');

module.exports = function (app,mypassport) {
  app.use('/LVPredimensionadeDBSE', router);
  passport = mypassport;
};


// Operaciones serias

function validateAndGetValue(req,res){
  req.checkQuery('tv', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('tv', validationErrors.val_err_isFloat()).isFloat();


  errors = req.validationErrors();
  if (errors) {
    res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    return;
  } else {

    var tv = Number(req.query.tv);

    var logicalErrors = StaticFunction.logicalValidation(tv);

    if (logicalErrors){
      res.status(400).send(logicalErrors);
      return;
    }

    var rawValues = StaticFunction.function(tv);
    var data = {
      'lv' : rawValues.lv.toFixed(2)
    };
    return data;

  }
}

function getInputs(req){

  var data = {
    'tv' : Number(req.query.tv)
  };
  return data;

}

//Para cálculos XML y JSON
//http://localhost:3705/LVPredimensionadeDBSE/?tv=30
router.get('/', function (req, res) {
  var result = validateAndGetValue(req,res);
  var inputs = getInputs(req);

  if (req.query.format == 'json'){
    if (result){
      res.json(result);
    }
  } else if(req.query.format == 'xml'){
    if (result){
      var msg = xmlify(result, { root: 'results' });
      res.set('Content-Type', 'text/xml');
      res.send(msg);
      res.end();
    }
  } else {
    res.send(result);
    res.set(400);
    res.end();
  };

  visitor.pageview("/LVPredimensionadeDBSE").send();

  db.SaveAPIRequest(req.connection.remoteAddress,"LVPredimensionadeDBSE",inputs);
});


// //Para cálculos del estilo http://localhost:3705/LVPredimensionadeDBSE/GUI/
// router.get('/GUI', function (req, res) {
//   //console.log(tabla.findService());
//   res.render('GUI_NotchedMembers', {
//     title: 'NotchedMembers',
//     woodtypes: tabla.findMaderaTypes(),
//     services: tabla.findServiceTypes()
//   });
//   res.end();
// });
//
// //Para cálculos del estilo http://localhost:3705/LVPredimensionadeDBSE/doc/
// router.get('/doc', function (req, res) {
//   //console.log(tabla.findService());
//   res.render('doc_NotchedMembers', {
//     title: 'Notched Members Documentation',
//     woodtypes: tabla.findMaderaTypes()
//   });
//   res.end();
// });
