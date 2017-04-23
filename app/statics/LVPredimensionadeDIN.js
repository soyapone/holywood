var tabla = require('./tables');
var fun = require('./funciones');
var _ = require('lodash');

exports.logicalValidation = function(Tv) {
  // Solo para hacer pruebas esta funcion no devuelve nada erroneo por
  //if (gammaM == 1) return "gammaM no puede ser 1";
  return;
}



exports.function = function(Tv){
  var lv = _.max([200,8*Tv]);

  var response = {
    'lv' : lv
  }
  return response;
}
