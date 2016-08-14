var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article'),
xmlify = require('xmlify'),
CompressionPerpendicularToTheGrain = require('../statics/CompressionPerpendicularToTheGrain'),
tabla = require('../statics/tables'),
validationErrors = require('../statics/validationErrors'),
util = require('util'),
passport = require('passport');;

module.exports = function (app,mypassport) {
  app.use('/CompressionPerpendicularToTheGrain', router);
  passport = mypassport;
};


//****************************
// Rutas para los cálculos
//****************************


// //Para cálculos del estilo http://localhost:3705/GUI/calculation/12/33f3
// app.get('/GUI/:var1/:var2', function (req, res) {
//   var res1 = Number(req.params.var1)+Number(req.params.var2);
//   res.render('calculation', {
//     title: 'calculation',
//     var1: req.params.var1,
//     var2: req.params.var2,
//     res1: res1
//   });
//   res.end();
// });

// //Para cálculos JSON http://localhost:3705/JSON/calculo2?var1=3&var2=5
// app.get('/JSON', function (req, res) {
//   var var1 = Number(req.query.var1)
//   var var2 = Number(req.query.var2);
//   var res1 = var1+var2;
//
//   var result = {  "result": res1 };
//
//   res.json(result);
//   res.end();
// });
//
// //Para cálculos XML http://localhost:3705/XML/calculo2?var1=3&var2=5
// app.get('/XML', function (req, res) {
//   var var1 = Number(req.query.var1)
//   var var2 = Number(req.query.var2);
//   var res1 = var1+var2;
//   var result = {  "result": res1 };
//   var send = '<?xml version="1.0" encoding="utf-8"?>'.concat("\n").concat(xml(result));
//   res.set('Content-Type', 'text/xml');
//
//   res.send(send);
//   res.end();
// });


// Operaciones serias

function CompressionPerpendicularToTheGrainGetValue(req,res){
  req.checkQuery('Fd', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('Fd', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('b', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('b', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('l', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('l', validationErrors.val_err_isFloat()).isFloat();

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



    var Fd = Number(req.query.Fd)
    var b = Number(req.query.b);
    var l = Number(req.query.l);
    var a1 = Number(req.query.a1);
    var a2 = Number(req.query.a2);
    var l1 = Number(req.query.l1);
    var h = Number(req.query.h);
    var Continuous = ((req.query.Continuous === "true")||(req.query.Continuous === "True"));
    var s = req.query.s;
    var service = Number(req.query.service);
    var LoadDuration = req.query.LoadDuration;
    var gammaM = Number(req.query.gammaM);

    var logicalErrors = CompressionPerpendicularToTheGrain.logicalValidation(Fd,b,l,a1,a2,l1,h,Continuous,s,service,LoadDuration,gammaM);

    if (logicalErrors){
     res.status(400).send(logicalErrors);
     return;
    }

    var rawValues = CompressionPerpendicularToTheGrain.compresion90ServicioDuracion(Fd,b,l,a1,a2,l1,h,Continuous,s,service,LoadDuration,gammaM);
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

//Para cálculos XML y JSON
//http://localhost:3705/CompressionPerpendicularToTheGrain/?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&Continuous=false&s=GL24h&service=1&LoadDuration=S&gammaM=1.25&format=xml
router.get('/', function (req, res) {
 var result = CompressionPerpendicularToTheGrainGetValue(req,res);
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


//Para cálculos del estilo http://localhost:3705/CompressionPerpendicularToTheGrain/GUI/
router.get('/GUI', function (req, res) {
  //console.log(tabla.findService());
  res.render('CompressionPerpendicularToTheGrain', {
    title: 'Compression Perpendicular to the Grain',
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
