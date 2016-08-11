var p1 = require('./NotchedMembers');

//function(Vd,b,hef,h,Kcrit,d,tipoMadera,x,servicio,duracion, gammaM,notchOnSupport)

var s = p1.notchedMembers(10000,70,140,70,true,70, "GL24h", 70, 1, "S", 1.30,true);

console.log("El resultado es: ",s);
