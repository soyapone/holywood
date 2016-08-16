var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article'),
xmlify = require('xmlify'),
NotchedMembers = require('../statics/NotchedMembers'),
tabla = require('../statics/tables'),
validationErrors = require('../statics/validationErrors'),
util = require('util'),
passport = require('passport');;

module.exports = function (app,mypassport) {
  app.use('/NotchedMembers', router);
  passport = mypassport;
};


// Operaciones serias

function validateAndGetValue(req,res){
  req.checkQuery('Vd', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('Vd', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('b', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('b', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('hef', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('hef', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('h', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('h', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('Kcr', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('Kcr', validationErrors.val_err_isIn(["false","true"])).isIn(["false","true"]);

  req.checkQuery('d', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('d', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('s', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('s', validationErrors.val_err_isIn(tabla.findMaderaTypes())).isIn(tabla.findMaderaTypes());

  req.checkQuery('x', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('x', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('service', validationErrors.val_err_notEmpty()).notEmpty();

  req.checkQuery('LoadDuration', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('LoadDuration', validationErrors.val_err_isIn(tabla.findServiceTypes())).isIn(tabla.findServiceTypes());

  req.checkQuery('gammaM', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('gammaM', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('notchOnSupport', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('notchOnSupport', validationErrors.val_err_isIn(["false","true"])).isIn(["false","true"]);

  errors = req.validationErrors();
  if (errors) {
    res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    return;
  } else {

    var Vd = Number(req.query.Vd)
    var b = Number(req.query.b);
    var hef = Number(req.query.hef);
    var h = Number(req.query.h);
    var Kcr = ((req.query.Kcr === "true")||(req.query.Kcr === "True"));
    var d = Number(req.query.d);
    var s = req.query.s;
    var x = Number(req.query.x);
    var service = Number(req.query.service);
    var LoadDuration = req.query.LoadDuration;
    var gammaM = Number(req.query.gammaM);
    var notchOnSupport = ((req.query.notchOnSupport === "true")||(req.query.notchOnSupport === "True"));


    var logicalErrors = NotchedMembers.logicalValidation(Vd,b,hef,h,Kcr,d,s,x,service,LoadDuration,gammaM,notchOnSupport);

    if (logicalErrors){
     res.status(400).send(logicalErrors);
     return;
    }

    var rawValues = NotchedMembers.NotchedMembers(Vd,b,hef,h,Kcr,d,s,x,service,LoadDuration,gammaM,notchOnSupport);
    var data = {
      'Kn' : rawValues.Kn.toFixed(2),
      'Kv' : rawValues.Kv.toFixed(2),
      'Fvd' : rawValues.Fvd.toFixed(2),
      'TauD': rawValues.TauD.toFixed(2),
      'index': rawValues.index.toFixed(2)
    };
    return data;

  }
}

//Para cálculos XML y JSON
//http://localhost:3705/NotchedMembers/?Vd=14752&b=90&hef=70&h=5&Kcr=false&d=97&s=GL24h&x=4&service=1&LoadDuration=S&gammaM=1.25&notchOnSupport=true&format=xml
router.get('/', function (req, res) {
 var result = validateAndGetValue(req,res);
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
});


//Para cálculos del estilo http://localhost:3705/NotchedMembers/GUI/
router.get('/GUI', function (req, res) {
  //console.log(tabla.findService());
  res.render('NotchedMembers', {
    title: 'NotchedMembers',
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes()
  });
  res.end();
});


//Para cálculos JSON
//http://localhost:3705/JSON/CompressionPerpendicularToTheGrain?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&Continuous=false&s=GL24h&service=1&LoadDuration=S&gammaM=1.25
// app.get('/JSON', function (req, res) {
//   var result = CompressionPerpendicularToTheGrainGetValue(req,res);
//   if (result){
//     res.json(result);
//   }
//
// });
