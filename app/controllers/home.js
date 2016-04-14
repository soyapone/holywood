var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

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

router.get('/calculo/:var1/:var2', function (req, res) {
  var res1 = Number(req.params.var1)+Number(req.params.var2);
  res.render('calculo', {
    title: 'calculo',
    var1: req.params.var1,
    var2: req.params.var2,
    res1: res1
  });
  res.end();
});
