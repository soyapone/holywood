var tabla = require('./tables');
var _ = require ('lodash');





exports.compresion90ServicioDuracion = function(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,servicio,duracion,gammaM){
  var CompresionPerpendicular = tabla.getfc90k(tipoMadera);
  var kmod = tabla.findServicioDuracion(servicio,duracion);
  return this.compresion90Kmod(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,kmod,CompresionPerpendicular,gammaM);
}

exports.compresion90Kmod = function(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,kmod,CompresionPerpendicular,gammaM){
  //devolvemos tambien, sigmaC90d y fc90d, areaEf, indice


  var aa1 = _.min([a1, l, l1/2]);
  var aa2 = _.min([a2, l, l1/2]);

  var areaEf = this.areaEf(b,l,aa1,aa2);
  var sigmaC90d = Fd/areaEf;

  var fc90d = this.fc90d(kmod,CompresionPerpendicular, gammaM);

  var index = sigmaC90d/(this.kc90(l1,h,durmiente,tipoMadera)*fc90d);

  var response = {
    'sigmaC90d' : sigmaC90d,
    'fc90d' : fc90d,
    'areaEf' : areaEf,
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

exports.kc90 = function (l1,h,durmiente,tipoMadera){
  if (l1>= 2*h){
    if (durmiente){
      if(tabla.isConiferous(tipoMadera)){
        return 1.25;
      }
      if(tabla.isGL(tipoMadera)){
        return 1.5;
      }
    } else {
      if(tabla.isConiferous(tipoMadera)){
        return 1.50;
      }
      if(tabla.isGL(tipoMadera)){
        return 1.75;
      }
    }
  } else {
    return 1;
  }
  return "Hardwood not defined by normative."
}

exports.fc90d = function (kmod, CompresionPerpendicular, gammaM) {
  return  (kmod * CompresionPerpendicular)/ gammaM;;
}

// var prueba = this.compresion90Kmod(14752, 90, 70, 0, 30, 1000, 300, false, "GL24h", 0.9, 2.5, 1.25);
// console.log("El resultado es: ",prueba);
//
// var prueba = this.compresion90ServicioDuracion(14752, 90, 70, 0, 30, 1000, 300, false, "GL24h", 1, 'S', 2.5, 1.25);
// console.log("El resultado es: ",prueba);
//
//
// var prueba1 = fc90d(0.9, 2.5, 1.25);
//
// console.log("fc90d: ",prueba1);
//
// var prueba2 = kc90(1000, 300, false, "GL24h");
//
// console.log("kc90: ",prueba2);
//
// var prueba3 = areaEf(90, 70, 0, 30);
//
// console.log("areaEf: ",prueba3);
