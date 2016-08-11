var tabla = require('./tables');
var fun = require('./funciones');


exports.compresionOblicuaDIN = function(falfaD,b,l,c1,c2,h,durmiente,tipoMadera,servicio,duracion,gammaM, alfGr){
  // Considereamos l1 como infinito o el máximo valor para que se cumpla la función de KC90 y en el área eficaz.
  var alf = fun.toRadian(alfGr);
  var l1 = Number.MAX_VALUE;
  var kc90 = fun.kc90(l1,h,durmiente,tipoMadera);
  var kmod = tabla.findServiceDuracion(servicio,duracion);
  var areaEf= fun.areaEf(b,l,l1,c1,c1,alf);
  var sigmacAlfaD = this.sigmacAlfaD(falfaD,areaEf);
  var fcalfaD = this.fcalfaD(kmod, gammaM,kc90,  tipoMadera,alf);
  var kcalf = this.kcalf(kc90,alf);
  //devolver el areaEf, kc90, fcalfad, kcalf, index
  var index = sigmacAlfaD / (kcalf * fcalfaD);

  var response = {
    'areaEf' : areaEf,
    'kc90': kc90,
    'fcalfaD': fcalfaD,
    'kcalf': kcalf,
    'index': index
  }
  return response;

}

exports.sigmacAlfaD = function(falfaD,areaEf){
  return falfaD / areaEf;
}

exports.kcalf = function(kc90, alf){

  return (1 + (kc90 -1)*Math.sin(alf));
}

//es distinto a compresión oblicua de eurocódigo
exports.fcalfaD = function(kmod, gammaM,kc90, tipoMadera,alf){
  // Falta por hacer
  var fc0d = fun.valorDeCalculo(kmod, tabla.getfc0k(tipoMadera), gammaM);
  var fc90d = fun.valorDeCalculo(kmod, tabla.getfc90k(tipoMadera), gammaM);
  var fvd = fun.valorDeCalculo(kmod, tabla.getfvk(tipoMadera), gammaM);
  var seno = Math.sin(alf);
  var seno2 = Math.pow(Math.sin(alf), 2);
  var coseno = Math.cos(alf);
  var coseno4 = Math.pow(Math.cos(alf), 4);

  var a = Math.pow((fc0d/fc90d) * seno2,2);
  var b = Math.pow((fc0d/(1.5 * fvd)) * seno * coseno,2);


  return fc0d / Math.sqrt(a+b+coseno4);
};
