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
var images = ['/img/CompressiveStressesAtAnAngleToTheGrain/AllCases/AllCases1.jpg', '/img/CompressiveStressesAtAnAngleToTheGrain/AllCases/AllCases2.jpg'];

var db = require('../statics/APIRequests_db');

module.exports = function (app,mypassport) {
  app.use('/CompressiveStressesAtAnAngleToTheGrain', router);
  passport = mypassport;
};

//Para cálculos del estilo http://localhost:3705/CompressiveStressesAtAnAngleToTheGrain/
router.get('/', function (req, res) {
  //console.log(tabla.findService());
  res.render('GUI_CompressiveStressesAtAnAngleToTheGrain', {
    title: 'Compressive Stresses at an Angle to the Grain',
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    images: images,
    fixedValues:{}
  });
  res.end();
});

//Para cálculos del estilo http://localhost:3705/CompressiveStressesAtAnAngleToTheGrain/AngleRafter
router.get('/AngleRafter', function (req, res) {
  //console.log(tabla.findService());
  res.render('GUI_CompressiveStressesAtAnAngleToTheGrain', {
    title: 'Compressive Stresses at an Angle Rafter to the Grain',
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    images: images,
    // Nos hemos inventado ContinuousFixed para indicar que está fijado
    // Y l1 para decir que lo queremos fijar, luego en el EJS se fija a h
    fixedValues:{ l1:true, ContinuousFixed:true , Continuous: false}
  });
  res.end();
});
