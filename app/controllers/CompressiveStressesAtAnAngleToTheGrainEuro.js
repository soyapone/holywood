var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
xmlify = require('xmlify'),
CompressiveStressesAtAnAngleToTheGrainEuro = require('../statics/CompresionOblicuaEurocodigo'),
tabla = require('../statics/tables'),
validationErrors = require('../statics/validationErrors'),
util = require('util'),
passport = require('passport');

var ua = require('universal-analytics');
var visitor = ua('UA-80763829-1');

var db = require('../statics/APIRequests_db');

module.exports = function (app,mypassport) {
  app.use('/CompressiveStressesAtAnAngleToTheGrainEuro', router);
  passport = mypassport;
};

// Operaciones serias

function validateAndGetValue(req,res){
  req.checkQuery('falfaD', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('falfaD', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('b', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('b', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('l', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('l', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('l1', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('l1', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('c1', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('c1', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('c2', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('c2', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('h', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('h', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('Continuous', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('Continuous', validationErrors.val_err_isIn(["false","true"])).isIn(["false","true"]);

  req.checkQuery('s', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('s', validationErrors.val_err_isIn(tabla.findMaderaTypes())).isIn(tabla.findMaderaTypes());

  req.checkQuery('service', validationErrors.val_err_notEmpty()).notEmpty();

  req.checkQuery('LoadDuration', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('LoadDuration', validationErrors.val_err_isIn(tabla.findServiceTypes())).isIn(tabla.findServiceTypes());

  req.checkQuery('gammaM', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('gammaM', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('alfaGr', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('alfaGr', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('format', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('format', validationErrors.val_err_isIn(["json","xml"])).isIn(["json","xml"]);



  errors = req.validationErrors();
  if (errors) {
    res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    return;
  } else {

    var falfaD = Number(req.query.falfaD);
    var b = Number(req.query.b);
    var l = Number(req.query.l);
    var l1 = Number(req.query.l1);
    var c1 = Number(req.query.c1);
    var c2 = Number(req.query.c2);
    var h = Number(req.query.h);
    var Continuous = ((req.query.Continuous === "true")||(req.query.Continuous === "True"));
    var s = req.query.s;
    var service = Number(req.query.service);
    var LoadDuration = req.query.LoadDuration;
    var gammaM = Number(req.query.gammaM);
    var alfaGr = Number(req.query.alfaGr);

    var logicalErrors = CompressiveStressesAtAnAngleToTheGrainEuro.logicalValidation(falfaD,b,l,l1,c1,c2,h,Continuous,s,service,LoadDuration,gammaM,alfaGr);

    if (logicalErrors){
      res.status(400).send(logicalErrors);
      return;
    }


    var rawValues = CompressiveStressesAtAnAngleToTheGrainEuro.compresionOblicuaEurocodigo(falfaD,b,l,l1,c1,c2,h,Continuous,s,service,LoadDuration,gammaM,alfaGr);
    var data = {
      'areaEf' : rawValues.areaEf.toFixed(0),
      'kc90' : rawValues.kc90.toFixed(2),
      'fcalfaD' : rawValues.fcalfaD.toFixed(2),
      'index': rawValues.index.toFixed(2)
    };
    return data;
  }
}


function getInputs(req){

  var data = {
    'falfaD' : Number(req.query.falfaD),
    'b' : Number(req.query.b),
    'l' : Number(req.query.l),
    'l1' : Number(req.query.l1),
    'c1' : Number(req.query.c1),
    'c2' : Number(req.query.c2),
    'h' : Number(req.query.h),
    'Continuous' : ((req.query.Continuous === "true")||(req.query.Continuous === "True")),
    's' : req.query.s,
    'service' : Number(req.query.service),
    'LoadDuration' : req.query.LoadDuration,
    'gammaM' : Number(req.query.gammaM),
    'alfaGr' : Number(req.query.alfaGr)
  };
  return data;

}


//Para cálculos XML y JSON
//http://localhost:3705/CompressiveStressesAtAnAngleToTheGrainEURO/?falfaD=1&b=90&l=70&l1=1000&c1=0&c2=30&h=300&Continuous=false&s=GL24h&service=1&LoadDuration=S&gammaM=1.25&alfaGr=30.5&format=xml
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
  visitor.pageview("/CompressiveStressesAtAnAngleToTheGrainEURO").send();

  db.SaveAPIRequest(req.connection.remoteAddress,"CompressiveStressesAtAnAngleToTheGrainEURO",inputs);

});


//Para cálculos del estilo http://localhost:3705/CompressiveStressesAtAnAngleToTheGrainEURO/GUI/
router.get('/GUI', function (req, res) {
  //console.log(tabla.findService());
  res.render('CompressiveStressesAtAnAngleToTheGrain', {
    title: 'Compressive Stresses at an Angle to the Grain',
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes()
  });
  res.end();
});


//Para cálculos del estilo http://localhost:3705/CompressiveStressesAtAnAngleToTheGrainEURO/doc/
router.get('/doc', function (req, res) {
  //console.log(tabla.findService());
  res.render('doc_CompressiveStressesAtAnAngleToTheGrainEURO', {
    title: 'Compressive Stresses At An Angle To The Grain EUROCODE 5 Documentation',
    woodtypes: tabla.findMaderaTypes()
  });
  res.end();
});
