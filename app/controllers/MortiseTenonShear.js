var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
xmlify = require('xmlify'),
StaticFunction = require('../statics/MortiseTenonShear'),
tabla = require('../statics/tables'),
validationErrors = require('../statics/validationErrors'),
util = require('util'),
passport = require('passport');

var ua = require('universal-analytics');
var visitor = ua('UA-80763829-1');

var db = require('../statics/APIRequests_db');

module.exports = function (app,mypassport) {
  app.use('/MortiseTenonShear', router);
  passport = mypassport;
};


// Operaciones serias

function validateAndGetValue(req,res){
  req.checkQuery('sc', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('sc', validationErrors.val_err_isIn(tabla.findMaderaTypes())).isIn(tabla.findMaderaTypes());

  req.checkQuery('lc', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('lc', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('v', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('v', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('service', validationErrors.val_err_notEmpty()).notEmpty();

  req.checkQuery('hs', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('hs', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('LoadDuration', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('LoadDuration', validationErrors.val_err_isIn(tabla.findServiceTypes())).isIn(tabla.findServiceTypes());

  req.checkQuery('hc', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('hc', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('b', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('b', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('gammaM', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('gammaM', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('hi', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('hi', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('vd', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('vd', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('format', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('format', validationErrors.val_err_isIn(["json","xml"])).isIn(["json","xml"]);



  errors = req.validationErrors();
  if (errors) {
    res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    return;
  } else {


    var sc = req.query.sc;
    var lc = Number(req.query.lc)
    var v = Number(req.query.v);
    var service = Number(req.query.service);
    var hs = Number(req.query.hs);
    var LoadDuration = req.query.LoadDuration;
    var hc = Number(req.query.hc);
    var b = Number(req.query.b);
    var gammaM = Number(req.query.gammaM);
    var hi = Number(req.query.hi);
    var vd = Number(req.query.vd);

    var logicalErrors = StaticFunction.logicalValidation(sc, lc, v, service, hs, LoadDuration, hc, b, gammaM, hi,vd);

    if (logicalErrors){
      res.status(400).send(logicalErrors);
      return;
    }

    var rawValues = StaticFunction.function(sc, lc, v, service, hs, LoadDuration, hc, b, gammaM, hi,vd);
    //console.log('rawValues', rawValues);

    var data = {
      'Kv' : rawValues.Kv.toFixed(2),
      'Rk' : rawValues.Rk.toFixed(2),
      'Rd' : rawValues.Rd.toFixed(2),
      'index' : rawValues.index.toFixed(2)
    };
    return data;

  }
}


function getInputs(req){

  var data = {
    'sc' : req.query.sc,
    'lc' : Number(req.query.lc),
    'v' : Number(req.query.v),
    'service' : Number(req.query.service),
    'hs' : Number(req.query.hs),
    'LoadDuration' : req.query.LoadDuration,
    'hc' : Number(req.query.hc),
    'b' : Number(req.query.b),
    'gammaM' : Number(req.query.gammaM),
    'hi' : Number(req.query.hi),
    'vd' : Number(req.query.vd)
  };
  return data;

}


//Para cálculos XML y JSON
//http://localhost:3705/MortiseTenonShear/?sc=C14&lc=21&v=21&service=1&hs=21&LoadDuration=P&hc=21&b=21&gammaM=1.3&hi=21&vd=1000&format=xml
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
  visitor.pageview("/MortiseTenonShear").send();

  db.SaveAPIRequest(req.connection.remoteAddress,"MortiseTenonShear",inputs);
});

//
// //Para cálculos del estilo //http://localhost:3705/MortiseTenonShear/GUI
// router.get('/GUI', function (req, res) {
//   //console.log(tabla.findService());
//   res.render('MortiseTenonPillar', {
//     title: 'Mortise and Tenon as a Pillar',
//     woodtypes: tabla.findMaderaTypes(),
//     services: tabla.findServiceTypes()
//   });
//   res.end();
// });
//
//
// //Para cálculos del estilo http://localhost:3705/MortiseTenonShear/doc/
// router.get('/doc', function (req, res) {
//   //console.log(tabla.findService());
//   res.render('doc_MortiseTenonPillar', {
//     title: 'Mortise Tenon Pillar Documentation',
//     woodtypes: tabla.findMaderaTypes()
//   });
//   res.end();
// });
