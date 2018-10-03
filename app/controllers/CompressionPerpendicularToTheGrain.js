var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article'),
xmlify = require('xmlify'),
CompressionPerpendicularToTheGrain = require('../statics/CompressionPerpendicularToTheGrain'),
tabla = require('../statics/tables'),
validationErrors = require('../statics/validationErrors'),
util = require('util'),
passport = require('passport');

var ua = require('universal-analytics');
var visitor = ua('UA-80763829-1');

var db = require('../statics/APIRequests_db');

var images = ['/img/CompresionPerpendicularToTheGrain/AllCases/CompressionPerpendicularToTheGrain.jpg', '/img//CompresionPerpendicularToTheGrain/AllCases/CompresionPerpendicularPuntu.jpg'];

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

function validateAndGetValue(req,res){
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



    var Fd = Number(req.query.Fd);
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

  var data = {
    'Fd' : Number(req.query.Fd),
    'b' : Number(req.query.b),
    'l' : Number(req.query.l),
    'a1' : Number(req.query.a1),
    'a2' : Number(req.query.a2),
    'l1' : Number(req.query.l1),
    'h' : Number(req.query.h),
    'Continous' : ((req.query.Continuous === "true")||(req.query.Continuous === "True")),
    's' : req.query.s,
    'service' : Number(req.query.service),
    'LoadDuration' : req.query.LoadDuration,
    'hi' : Number(req.query.hi)
  };
  return data;

}



//Para cálculos XML y JSON
//http://localhost:3705/CompressionPerpendicularToTheGrain/api?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&Continuous=false&s=GL24h&service=1&LoadDuration=S&gammaM=1.25&format=xml
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
  visitor.pageview("/CompressionPerpendicularToTheGrain").send();

  db.SaveAPIRequest(req.connection.remoteAddress,"CompressionPerpendicularToTheGrain",inputs);

});


//Para todos los casos generales http://localhost:3705/CompressionPerpendicularToTheGrain/
router.get('/', function (req, res) {
  //console.log(tabla.findService());

  res.render('GUI_CompressionPerpendicularToTheGrain', {
    title: 'Compression Perpendicular to the Grain: All Cases',
    images: images,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    fixedValues:{}
  });
  res.end();
});

//Para el caso. MiddleSleeperBeam http://localhost:3705/CompressionPerpendicularToTheGrain/MiddleSleeperBeam
router.get('/MiddleSleeperBeam', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/CompresionPerpendicularToTheGrain/MiddleSleeperBeam/MidleSleeperBeam.png'];

  res.render('GUI_CompressionPerpendicularToTheGrain', {
    title: 'Compression Perpendicular to the Grain: Middle Sleeper Beam',
    images: images,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    // Me invento un parámetro más (ContinuousFixed) para saber si se fija o no, porque no hay manera de saber si está activado en EJS
    fixedValues:{ a1 : 30, a2 : 30, ContinuousFixed:true , Continuous: true}
  });
  res.end();
});

//Para el caso. EndSleeperPillar http://localhost:3705/CompressionPerpendicularToTheGrain/EndSleeperPillar
router.get('/EndSleeperPillar', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/CompresionPerpendicularToTheGrain/EndSleeperPillar/EndSleeperPillar.png'];

  res.render('GUI_CompressionPerpendicularToTheGrain', {
    title: 'Compression Perpendicular to the Grain: End Sleeper Pillar',
    images: images,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    // Me invento un parámetro más (ContinuousFixed) para saber si se fija o no, porque no hay manera de saber si está activado en EJS
    fixedValues:{ a1 : 0, a2 : 30, ContinuousFixed:true , Continuous: true}
  });
  res.end();
});


//Para el caso. EndSleeperPillar http://localhost:3705/CompressionPerpendicularToTheGrain/MiddleSleeperPillar
router.get('/MiddleSleeperPillar', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/CompresionPerpendicularToTheGrain/MiddleSleeperPillar/MiddleSleeperPillar.png'];

  res.render('GUI_CompressionPerpendicularToTheGrain', {
    title: 'Compression Perpendicular to the Grain: Middle Sleeper Pillar',
    images: images,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    // Me invento un parámetro más (ContinuousFixed) para saber si se fija o no, porque no hay manera de saber si está activado en EJS
    fixedValues:{ a1 : 30, a2 : 30, ContinuousFixed:true , Continuous: true}
  });
  res.end();
});


//Para el caso. EndSleeperBeam http://localhost:3705/CompressionPerpendicularToTheGrain/EndSleeperBeam
router.get('/EndSleeperBeam', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/CompresionPerpendicularToTheGrain/EndSleeperBeam/EndSleeperBeam.png'];

  res.render('GUI_CompressionPerpendicularToTheGrain', {
    title: 'Compression Perpendicular to the Grain: End Sleeper Beam',
    images: images,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    // Me invento un parámetro más (ContinuousFixed) para saber si se fija o no, porque no hay manera de saber si está activado en EJS
    fixedValues:{ a1 : 0, a2 : 30, ContinuousFixed:true , Continuous: true}
  });
  res.end();
});


//Para el caso. BeamCompression http://localhost:3705/CompressionPerpendicularToTheGrain/BeamCompression
router.get('/BeamCompression', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/CompresionPerpendicularToTheGrain/BeamCompression/BeamCompression.png'];

  res.render('GUI_CompressionPerpendicularToTheGrain', {
    title: 'Compression Perpendicular to the Grain: Beam Compression',
    images: images,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    // Me invento un parámetro más (ContinuousFixed) para saber si se fija o no, porque no hay manera de saber si está activado en EJS
    fixedValues:{ a1 : 0, a2 : 30, l1 : 1, ContinuousFixed:true , Continuous: true}
  });
  res.end();
});

//Para el caso. EndDiscreteSupport http://localhost:3705/CompressionPerpendicularToTheGrain/EndDiscreteSupport
router.get('/EndDiscreteSupport', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/CompresionPerpendicularToTheGrain/EndDiscreteSupport/EndDiscreteSupport.png'];

  res.render('GUI_CompressionPerpendicularToTheGrain', {
    title: 'Compression Perpendicular to the Grain: End Discrete Support',
    images: images,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    // Me invento un parámetro más (ContinuousFixed) para saber si se fija o no, porque no hay manera de saber si está activado en EJS
    fixedValues:{ a2 : 30, ContinuousFixed:true , Continuous: false}
  });
  res.end();
});


//Para documentación http://localhost:3705/CompressionPerpendicularToTheGrain/doc/
router.get('/doc', function (req, res) {
  //console.log(tabla.findService());
  res.render('doc_CompressionPerpendicularToTheGrain', {
    title: 'Compression Perpendicular To The Grain',
    images: images,
    woodtypes: tabla.findMaderaTypes()
  });
  res.end();
});
