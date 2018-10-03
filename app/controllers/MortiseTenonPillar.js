var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article'),
xmlify = require('xmlify'),
MortiseTenonPillar = require('../statics/MortiseTenonPillar'),
tabla = require('../statics/tables'),
validationErrors = require('../statics/validationErrors'),
util = require('util'),
passport = require('passport');

var ua = require('universal-analytics');
var visitor = ua('UA-80763829-1');
var images = ['/img/MortiseTenon/MortiseTenonPillar/MortiseTenonPillar.jpg'];

var db = require('../statics/APIRequests_db');


module.exports = function (app,mypassport) {
  app.use('/MortiseTenonPillar', router);
  passport = mypassport;
};


// Operaciones serias

function validateAndGetValue(req,res){
  req.checkQuery('Nd', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('Nd', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('b', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('b', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('hprime', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('hprime', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('bprime', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('bprime', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('lprime', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('lprime', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('a1', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('a1', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('a2', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('a2', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('l1', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('l1', validationErrors.val_err_isFloat()).isFloat();

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

  req.checkQuery('format', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('format', validationErrors.val_err_isIn(["json","xml"])).isIn(["json","xml"]);



  errors = req.validationErrors();
  if (errors) {
    res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    return;
  } else {



    var Nd = Number(req.query.Nd);
    var b = Number(req.query.b);
    var hprime = Number(req.query.hprime);
    var bprime = Number(req.query.bprime);
    var lprime = Number(req.query.lprime);
    var a1 = Number(req.query.a1);
    var a2 = Number(req.query.a2);
    var l1 = Number(req.query.l1);
    var h = Number(req.query.h);
    var Continuous = ((req.query.Continuous === "true")||(req.query.Continuous === "True"));
    var s = req.query.s;
    var service = Number(req.query.service);
    var LoadDuration = req.query.LoadDuration;
    var gammaM = Number(req.query.gammaM);

    var logicalErrors = MortiseTenonPillar.logicalValidation(Nd,b,hprime,bprime,lprime,a1,a2,l1,h,Continuous,s,service,LoadDuration,gammaM);

    if (logicalErrors){
      res.status(400).send(logicalErrors);
      return;
    }

    var rawValues = MortiseTenonPillar.funcion(Nd,b,hprime,bprime,lprime,a1,a2,l1,h,Continuous,s,service,LoadDuration,gammaM);
    //console.log('rawValues', rawValues);

    var data = {
      'sigmaC90d' : rawValues.sigmaC90d.toFixed(2),
      'fc90d' : rawValues.fc90d.toFixed(2),
      'areaEf' : rawValues.areaEf.toFixed(0),
      'kc90': rawValues.kc90.toFixed(2),
      'index': rawValues.index.toFixed(2)
    };
    return data;

  }
}


function getInputs(req){


  var Nd = Number(req.query.Nd)
  var b = Number(req.query.b);
  var hprime = Number(req.query.hprime);
  var bprime = Number(req.query.bprime);
  var lprime = Number(req.query.lprime);
  var a1 = Number(req.query.a1);
  var a2 = Number(req.query.a2);
  var l1 = Number(req.query.l1);
  var h = Number(req.query.h);
  var Continuous = ((req.query.Continuous === "true")||(req.query.Continuous === "True"));
  var s = req.query.s;
  var service = Number(req.query.service);
  var LoadDuration = req.query.LoadDuration;
  var gammaM = Number(req.query.gammaM);


  var data = {
    'Nd' : Number(req.query.Nd),
    'b' : Number(req.query.b),
    'hprime' : Number(req.query.hprime),
    'bprime' : Number(req.query.bprime),
    'lprime' : Number(req.query.lprime),
    'a1' : Number(req.query.a1),
    'a2' : Number(req.query.a2),
    'l1' : Number(req.query.l1),
    'h' : Number(req.query.h),
    'Continuous' : ((req.query.Continuous === "true")||(req.query.Continuous === "True")),
    's' : req.query.s,
    'service' : Number(req.query.service),
    'LoadDuration' : req.query.LoadDuration,
    'gammaM' : Number(req.query.gammaM)
  };
  return data;

}

//Para cálculos XML y JSON
//http://localhost:3705/MortiseTenonPillar/api?Nd=21&b=21&hprime=21&bprime=21&lprime=21&a1=21&a2=21&l1=21&h=21&Continuous=true&s=C14&service=1&LoadDuration=P&gammaM=1.3&format=xml
router.get('/api', function (req, res) {
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
  visitor.pageview("/MortiseTenonPillar").send();

db.SaveAPIRequest(req.connection.remoteAddress,"MortiseTenonPillar",inputs);
});


//Para cálculos del estilo //http://localhost:3705/MortiseTenonPillar/
router.get('/', function (req, res) {
  //console.log(tabla.findService());
  res.render('GUI_MortiseTenonPillar', {
    title: 'Mortise and Tenon as a Pillar',
    images: images,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes()
  });
  res.end();
});


//Para cálculos del estilo http://localhost:3705/MortiseTenonPillar/doc/
router.get('/doc', function (req, res) {
  //console.log(tabla.findService());
  res.render('doc_MortiseTenonPillar', {
    title: 'Mortise Tenon Pillar Documentation',
    images: images,
    woodtypes: tabla.findMaderaTypes()
  });
  res.end();
});
