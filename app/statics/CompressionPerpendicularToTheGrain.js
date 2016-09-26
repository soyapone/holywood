var tabla = require('./tables');
var fun = require('./funciones');



exports.logicalValidation = function(Fd,b,l,a1,a2,l1,h,Continuous,s,service,LoadDuration,gammaM) {
  // Solo para hacer pruebas esta funcion no devuelve nada erroneo por
  //if (gammaM == 1) return "gammaM no puede ser 1";
  return;
}


exports.compresion90ServicioDuracion = function(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,servicio,duracion,gammaM){
  var CompresionPerpendicular = tabla.getfc90k(tipoMadera);
  var kmod = tabla.findServiceDuracion(servicio,duracion);
  return this.compresion90Kmod(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,kmod,CompresionPerpendicular,gammaM);
}

exports.compresion90Kmod = function(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,kmod,CompresionPerpendicular,gammaM){
  //devolvemos tambien, sigmaC90d y fc90d, areaEf, indice

  //Ponemos 90 a capón porque es el ángulo del área eficaz.
  var areaEf = fun.areaEf(b,l,l1,a1,a2,(Math.PI / 2));

  var sigmaC90d = Fd/areaEf;

  var fc90d = fun.valorDeCalculo(kmod,CompresionPerpendicular, gammaM);

  var kc90 = fun.kc90(l1,h,durmiente,tipoMadera);

  var index = sigmaC90d/(kc90*fc90d);

  var response = {
    'sigmaC90d' : sigmaC90d,
    'fc90d' : fc90d,
    'areaEf' : areaEf,
    'kc90': kc90,
    'index': index
  }
  return response;
}

// function sigmac90d(Fd,b,l,l1,a1,a2){
//   // aa1 es el menor de a1, l, l1/2
//   // aa2 es el menor de a2, l, l1/2
//   var aa1 = _.min([a1, l, l1/2]);
//   var aa2 = _.min([a2, l, l1/2]);
//   return Fd/areaEf(b,l,aa1,aa2);
// }

exports.areaEf = function (b,l,aa1,aa2){
  return b * (l + aa1 + aa2);
}



// exports.fc90d = function (kmod, CompresionPerpendicular, gammaM) {
//   return  (kmod * CompresionPerpendicular)/ gammaM;;
// }
