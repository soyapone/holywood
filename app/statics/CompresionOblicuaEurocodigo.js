var tabla = require('./tables');
var fun = require('./funciones');


exports.logicalValidation = function(falfaD,b,l,c1,c2,h,durmiente,tipoMadera,servicio,duracion,gammaM, alfGr) {
  // Solo para hacer pruebas esta funcion no devuelve nada erroneo por
  //if (gammaM == 1) return "gammaM no puede ser 1";
  return;
}

exports.compresionOblicuaEurocodigo = function(falfaD,b,l,c1,c2,h,durmiente,tipoMadera,servicio,duracion,gammaM, alfGr){
  // Considereamos l1 como infinito o el máximo valor para que se cumpla la función de KC90 y en el área eficaz.

  var alf = fun.toRadian(alfGr);
  var l1 = Number.MAX_VALUE;
  var kc90 = fun.kc90(l1,h,durmiente,tipoMadera);
  var kmod = tabla.findServiceDuracion(servicio,duracion);
  var areaEf= fun.areaEf(b,l,l1,c1,c1,alf);
  var sigmacAlfaD = this.sigmacAlfaD(falfaD,areaEf);
  var fcalfaD = this.fcalfaD(kmod, gammaM,kc90,  tipoMadera,alf);


  //devolver el areaEf, kc90, fcalfad, index

  var index = sigmacAlfaD / fcalfaD;

  var response = {
    'areaEf' : areaEf,
    'kc90': kc90,
    'fcalfaD': fcalfaD,
    'index': index
  }
  return response;
}

exports.sigmacAlfaD = function(falfaD,areaEf){
  return falfaD / areaEf;
}

exports.fcalfaD = function(kmod, gammaM,kc90, tipoMadera,alf){
  // Falta por hacer
  var fc0d = fun.valorDeCalculo(kmod, tabla.getfc0k(tipoMadera), gammaM);
  var fc90d = fun.valorDeCalculo(kmod, tabla.getfc90k(tipoMadera), gammaM);
  var seno = Math.pow(Math.sin(alf), 2);
  var coseno = Math.pow(Math.cos(alf), 2);

  return fc0d/((fc0d/(kc90*fc90d)*seno)+coseno);
};



// //-----------------------------------------------------
//
// function compresionOblicuaEurocodigo(Fd,b,l,a1,a2,l1,h,tipoMadera,servicio,duracion,gammaM, alf){
//   var kmod = tabla.findServicioDuracion(servicio,duracion);
//   var fc0d = fun.valorDeCalculo(kmod, tabla.getfc0k(tipoMadera), gammaM);
//   var fc90d = fun.valorDeCalculo(kmod, tabla.getfc90k(tipoMadera), gammaM);
//   var alf_radianes = toRadian(alf);
//
//   return compresionAlfaKmod(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,kmod,gammaM, alf);
// }
//
// function compresionAlfaKmod(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,kmod,CompresionPerpendicular,gammaM){
//   return sigmacAlfad(Fd,b,l,a1,a2)/(kcAlfa(l1,h,durmiente,tipoMadera)*fcAlfad(kmod,CompresionPerpendicular, gammaM));
// }
//
// function sigmac90d(Fd,b,l,a1,a2){
//   return Fd/areaEf(b,l,a1,a2);
// }
//
// function toRadian(alf){
//   return alf * Math.PI / 180;
// }
//
// function fcAlfad(fc0d, fc90d, alfa){
//   var a =  fc0d/(kc90 * fc90d);
//
//   return fc0d/(a * Math.pow(Math.sin(alfa), 2) + Math.pow(Math.cos(alfa), 2));
// }
