var tabla = require('./tables');
var fun = require('./funciones');


exports.logicalValidation = function(h2,beta) {
  // Solo para hacer pruebas esta funcion no devuelve nada erroneo por
  //if (gammaM == 1) return "gammaM no puede ser 1";
  return;
}



exports.function = function(h2,beta){
  var tv;

  if (beta<=50) {
    tv = h2/4;
  }else{
    if(beta>= 60){
      tv = h2/6;
    } else {
      tv =(h2/120)*(80-beta);
    }
  }

  var response = {
    'tv' : tv
  }
  return response;
}
