var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  xml = require('xml');

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

//Para cálculos del estilo http://localhost:3000/GUI/calculo/12/33f3
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

//Para cálculos del estilo http://localhost:3000/GUI/calculo2?var1=3&var2=5
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

//Para cálculos JSON http://localhost:3000/JSON/calculo2?var1=3&var2=5
router.get('/JSON/calculo2', function (req, res) {
  var var1 = Number(req.query.var1)
  var var2 = Number(req.query.var2);
  var res1 = var1+var2;

  var result = {  "result": res1 };

  res.json(result);
  res.end();
});

//Para cálculos XML http://localhost:3000/XML/calculo2?var1=3&var2=5
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
