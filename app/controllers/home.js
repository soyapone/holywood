var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  xml = require('xml'),
  compresionUniformePerpendicularFibre = require('../statics/compresionUniformePerpendicularFibre');

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

function compresionUniformePerpendicularFibreServicioDuracionGetIndex(req){
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

  console.log("Fd: ", Fd);
  console.log("b: ", b);
  console.log("l: ", l);
  console.log("a1: ", a1);
  console.log("a2: ", a2);
  console.log("l1: ", l1);
  console.log("h: ", h);
  console.log("Durmiente: " , durmiente);
  console.log("tipoMadera: ", tipoMadera);
  console.log("servicio: ", servicio);
  console.log("duracion: ", duracion);
  console.log("CompresionPerpendicular: ", CompresionPerpendicular);
  console.log("gammaM: ", gammaM);


  return compresionUniformePerpendicularFibre.compresion90ServicioDuracion(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,servicio,duracion,CompresionPerpendicular,gammaM);
}

//Para cálculos XML http://localhost:3705/XML/compresionUniformePerpendicularFibreServicioDuracion?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&durmiente=false&tipoMadera=GL24h&servicio=1&duracion=C&CompresionPerpendicular=2.5&gammaM=1.25
router.get('/XML/compresionUniformePerpendicularFibreServicioDuracion', function (req, res) {
  var index = compresionUniformePerpendicularFibreServicioDuracionGetIndex(req);

  var result = {  "index": index };
  var send = '<?xml version="1.0" encoding="utf-8"?>'.concat("\n").concat(xml(result));
  res.set('Content-Type', 'text/xml');

  res.send(send);
  res.end();
});
(14752, 90, 70, 0, 30, 1000, 300, false, "GL24h", 1, "C", 2.5, 1.25)

//Para cálculos JSON http://localhost:3705/JSON/compresionUniformePerpendicularFibreServicioDuracion?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&durmiente=false&tipoMadera=GL24h&servicio=1&duracion=C&CompresionPerpendicular=2.5&gammaM=1.25
router.get('/JSON/compresionUniformePerpendicularFibreServicioDuracion', function (req, res) {
var index = compresionUniformePerpendicularFibreServicioDuracionGetIndex(req);
var resultjson = {  "index": index };

  res.json(resultjson);
  res.end();
});
