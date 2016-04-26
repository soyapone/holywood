var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article'),
xml = require('xml'),
compresionUniformePerpendicularFibre = require('../statics/compresionUniformePerpendicularFibre');
tabla = require('../statics/tables');
validationErrors = require('../statics/validationErrors');
util = require('util');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

//Para cálculos del estilo http://localhost:3705/GUI/calculo/12/33f3
router.get('/GUI/calculo/:var1/:var2', function (req, res) {
  var res1 = Number(req.params.var1)+Number(req.params.var2);
  res.render('calculo', {
    title: 'calculo',
    var1: req.params.var1,
    var2: req.params.var2,
    res1: res1
  });
  res.end();
});

//Para cálculos del estilo http://localhost:3705/GUI/calculo2?var1=3&var2=5
router.get('/GUI/calculo2', function (req, res) {
  var res1 = Number(req.query.var1)+Number(req.query.var2);
  res.render('calculo', {
    title: 'calculo2',
    var1: req.query.var1,
    var2: req.query.var2,
    res1: res1
  });
  res.end();
});

//Para cálculos JSON http://localhost:3705/JSON/calculo2?var1=3&var2=5
router.get('/JSON/calculo2', function (req, res) {
  var var1 = Number(req.query.var1)
  var var2 = Number(req.query.var2);
  var res1 = var1+var2;

  var result = {  "result": res1 };

  res.json(result);
  res.end();
});

//Para cálculos XML http://localhost:3705/XML/calculo2?var1=3&var2=5
router.get('/XML/calculo2', function (req, res) {
  var var1 = Number(req.query.var1)
  var var2 = Number(req.query.var2);
  var res1 = var1+var2;
  var result = {  "result": res1 };
  var send = '<?xml version="1.0" encoding="utf-8"?>'.concat("\n").concat(xml(result));
  res.set('Content-Type', 'text/xml');

  res.send(send);
  res.end();
});


// Operaciones serias

function compresionUniformePerpendicularFibreServicioDuracionGetValue(req,res){
  req.checkQuery('Fd', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('Fd', validationErrors.val_err_isInt()).isInt();

  req.checkQuery('b', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('b', validationErrors.val_err_isInt()).isInt();

  req.checkQuery('l', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('l', validationErrors.val_err_isInt()).isInt();

  req.checkQuery('a1', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('a1', validationErrors.val_err_isInt()).isInt();

  req.checkQuery('a2', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('a2', validationErrors.val_err_isInt()).isInt();

  req.checkQuery('l1', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('l1', validationErrors.val_err_isInt()).isInt();

  req.checkQuery('h', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('h', validationErrors.val_err_isInt()).isInt();

  req.checkQuery('durmiente', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('durmiente', validationErrors.val_err_isIn(["false","true"])).isIn(["false","true"]);

  req.checkQuery('tipoMadera', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('tipoMadera', validationErrors.val_err_isIn(tabla.findMaderaTypes())).isIn(tabla.findMaderaTypes());

  req.checkQuery('servicio', validationErrors.val_err_notEmpty()).notEmpty();

  req.checkQuery('duracion', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('duracion', validationErrors.val_err_isIn(tabla.findMaderaTypes())).isIn(tabla.findServicioTypes());

  req.checkQuery('CompresionPerpendicular', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('CompresionPerpendicular', validationErrors.val_err_isFloat()).isFloat();

  req.checkQuery('gammaM', validationErrors.val_err_notEmpty()).notEmpty();
  req.checkQuery('gammaM', validationErrors.val_err_isFloat()).isFloat();

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
    var durmiente = ((req.query.durmiente === "true")||(req.query.durmiente === "True"));
    var tipoMadera = req.query.tipoMadera;
    var servicio = Number(req.query.servicio);
    var duracion = req.query.duracion;
    var CompresionPerpendicular = Number(req.query.CompresionPerpendicular);
    var gammaM = Number(req.query.gammaM);

    return compresionUniformePerpendicularFibre.compresion90ServicioDuracion(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,servicio,duracion,CompresionPerpendicular,gammaM);
  }
}

//Para cálculos XML http://localhost:3705/XML/compresionUniformePerpendicularFibreServicioDuracion?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&durmiente=false&tipoMadera=GL24h&servicio=1&duracion=C&CompresionPerpendicular=2.5&gammaM=1.25
router.get('/XML/compresionUniformePerpendicularFibreServicioDuracion', function (req, res) {

  var head = '<?xml version="1.0" encoding="utf-8"?>'.concat("\n")
  var index = compresionUniformePerpendicularFibreServicioDuracionGetValue(req,res);

  if (index){
    var result = {  "index" : index };
    var msg = head.concat(xml(result));
    res.set('Content-Type', 'text/xml');
    res.send(msg);
    res.end();
  }
});

//Para cálculos JSON http://localhost:3705/JSON/compresionUniformePerpendicularFibreServicioDuracion?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&durmiente=false&tipoMadera=GL24h&servicio=1&duracion=C&CompresionPerpendicular=2.5&gammaM=1.25
router.get('/JSON/compresionUniformePerpendicularFibreServicioDuracion', function (req, res) {
  var err;
  var index = compresionUniformePerpendicularFibreServicioDuracionGetValue(req,res);
  if (index){
    var resultjson = {  "index": index };
    res.json(resultjson);
    res.end();
  }

});
