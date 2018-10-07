var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article'),
xmlify = require('xmlify'),
NotchedMembers = require('../statics/NotchedMembers'),
tabla = require('../statics/tables'),
validationErrors = require('../statics/validationErrors'),
util = require('util'),
passport = require('passport');

var ua = require('universal-analytics');
var visitor = ua('UA-80763829-1');

var db = require('../statics/APIRequests_db');
var def = require('../statics/StaticValues.json');

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

function getInputs(req){

  var data = {
    'Vd' : Number(req.query.Vd),
    'b' : Number(req.query.b),
    'hef' : Number(req.query.hef),
    'h' : Number(req.query.h),
    'Kcr' : ((req.query.Kcr === "true")||(req.query.Kcr === "True")),
    'd' : Number(req.query.d),
    's' : req.query.s,
    'x' : Number(req.query.x),
    'service' : Number(req.query.service),
    'LoadDuration' : req.query.LoadDuration,
    'gammaM' : Number(req.query.gammaM),
    'notchOnSupport' : ((req.query.notchOnSupport === "true")||(req.query.notchOnSupport === "True"))
  };
  return data;

}

//Para cálculos XML y JSON
//http://localhost:3705/NotchedMembers/api?Vd=14752&b=90&hef=70&h=5&Kcr=false&d=97&s=GL24h&x=4&service=1&LoadDuration=S&gammaM=1.25&notchOnSupport=true&format=xml
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

  visitor.pageview("/NotchedMembers").send();

  db.SaveAPIRequest(req.connection.remoteAddress,"NotchedMembers",inputs);
});


//Para cálculos del estilo All Cases http://localhost:3705/NotchedMembers/
router.get('/', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/NotchedMembers/AllCases/NotchedMemberOnSupport.PNG', '/img/NotchedMembers/AllCases/NotchedMemberOpposite.PNG'];

  res.render('GUI_NotchedMembers', {
    title: 'Notched Members',
    images: images,
    description: def.FunctionsDefinitions.NotchedMembers.AllCases,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    fixedValues:{}
  });
  res.end();
});


//Para cálculos del estilo NotchOnSupport http://localhost:3705/NotchedMembers/NotchOnSupport
router.get('/NotchOnSupport', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/NotchedMembers/NotchOnSupport/NotchOnSupport.PNG'];

  res.render('GUI_NotchedMembers', {
    title: 'Notched Members: Notch On Support',
    images: images,
    description: def.FunctionsDefinitions.NotchedMembers.NotchOnSupport,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    // Me invento un parámetro más (notchOnSupportFixed) para saber si se fija o no, porque no hay manera de saber si está activado en EJS
    fixedValues:{notchOnSupportFixed:true, notchOnSupport:true}
  });
  res.end();
});


//Para cálculos del estilo NotchOppositeTheSupport http://localhost:3705/NotchedMembers/NotchOppositeTheSupport
router.get('/NotchOppositeTheSupport', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/NotchedMembers/NotchOppositeTheSupport/NotchOppositeTheSupport.PNG'];

  res.render('GUI_NotchedMembers', {
    title: 'Notched Members: Notch Opposite The Support',
    images: images,
    description: def.FunctionsDefinitions.NotchedMembers.NotchOppositeTheSupport,
    woodtypes: tabla.findMaderaTypes(),
    services: tabla.findServiceTypes(),
    // Me invento un parámetro más (notchOnSupportFixed) para saber si se fija o no, porque no hay manera de saber si está activado en EJS
    fixedValues:{h:100,d:100,x:50,notchOnSupportFixed:true, notchOnSupport:false}
  });
  res.end();
});


//Para cálculos del estilo http://localhost:3705/NotchedMembers/doc/
router.get('/doc', function (req, res) {
  //console.log(tabla.findService());
  var images = ['/img/NotchedMembers/AllCases/NotchedMemberOnSupport.PNG', '/img/NotchedMembers/AllCases/NotchedMemberOpposite.PNG'];
  res.render('doc_NotchedMembers', {
    title: 'Notched Members Documentation',
    images: images,
    description: def.FunctionsDefinitions.NotchedMembers.AllCases,
    woodtypes: tabla.findMaderaTypes()
  });
  res.end();
});
