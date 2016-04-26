var tabla = require('./tables');

function compresion90ServicioDuracion(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,servicio,duracion,CompresionPerpendicular,gammaM){
  var kmod = tabla.findServicioDuracion(servicio,duracion);
  return compresion90Kmod(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,kmod,CompresionPerpendicular,gammaM);
}

function compresion90Kmod(Fd,b,l,a1,a2,l1,h,durmiente,tipoMadera,kmod,CompresionPerpendicular,gammaM){
  return sigmac90d(Fd,b,l,a1,a2)/(kc90(l1,h,durmiente,tipoMadera)*fc90d(kmod,CompresionPerpendicular, gammaM));
}

function sigmac90d(Fd,b,l,a1,a2){
  return Fd/areaEf(b,l,a1,a2);
}

function areaEf(b,l,a1,a2){
  return b * (l + a1 + a2);
}

function kc90(l1,h,durmiente,tipoMadera){
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
  return "Frondosa no definido por la norma."
}

function fc90d(kmod, CompresionPerpendicular, gammaM) {
  return  (kmod * CompresionPerpendicular)/ gammaM;;
}

var prueba = compresion90Kmod(14752, 90, 70, 0, 30, 1000, 300, false, "GL24h", 0.9, 2.5, 1.25);
console.log("El resultado es: ",prueba);

var prueba = compresion90ServicioDuracion(14752, 90, 70, 0, 30, 1000, 300, false, "GL24h", 1, "C", 2.5, 1.25);
console.log("El resultado es: ",prueba);

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
