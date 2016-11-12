var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
//Article = mongoose.model('Article'),
xmlify = require('xmlify'),
//CompressionPerpendicularToTheGrain = require('../statics/CompressionPerpendicularToTheGrain'),
tabla = require('../statics/tables'),
validationErrors = require('../statics/validationErrors'),
util = require('util'),
passport = require('passport');;

module.exports = function (app,mypassport) {
  app.use('/CharacteristicValues', router);
  passport = mypassport;
};


function validateAndGetValue(req,res){
  req.checkQuery('s', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('s', validationErrors.val_err_isIn(tabla.findMaderaTypes())).isIn(tabla.findMaderaTypes());

  req.checkQuery('format', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('format', validationErrors.val_err_isIn(["json","xml"])).isIn(["json","xml"]);



  errors = req.validationErrors();
  if (errors) {
    res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    return;
  } else {



    var s = req.query.s;

    var rawValues = tabla.find(s);
    //console.log('rawValues', rawValues);

    return rawValues;
    // var data = {
    //   'sigmaC90d' : rawValues.sigmaC90d.toFixed(2),
    //   'fc90d' : rawValues.fc90d.toFixed(2),
    //   'areaEf' : rawValues.areaEf.toFixed(0),
    //   'kc90': rawValues.kc90.toFixed(2),
    //   'index': rawValues.index.toFixed(2)
    // };
    // return data;

  }
}

//Para cálculos XML y JSON
//http://localhost:3705/CharacteristicValues/?s=C14&format=xml
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


//Para cálculos del estilo http://localhost:3705/CharacteristicValues/GUI/
router.get('/GUI', function (req, res) {
  //console.log(tabla.findService());
  res.render('CharacteristicValues', {
    title: 'Characteristic Values',
    woodtypes: tabla.findMaderaTypes()
  });
  res.end();
});
