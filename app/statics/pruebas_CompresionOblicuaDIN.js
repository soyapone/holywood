var p1 = require('./CompresionOblicuaDIN');

//p1.compresionOblicuaEurocodigo(falfaD,b,l,c1,c2,h,durmiente,tipoMadera,servicio,duracion,gammaM, alf);

var s = p1.compresionOblicuaDIN(10000,50,70,30,30,250,false,"C24",1,"S",1.3, 30);

console.log("El resultado es: ",s);
