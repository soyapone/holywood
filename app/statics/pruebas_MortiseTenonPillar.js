var p1 = require('./MortiseTenonPillar');

//function(Vd,b,hef,h,Kcrit,d,tipoMadera,x,servicio,duracion, gammaM,notchOnSupport)

var s = p1.funcion(14752,90,14752,90,90,30,0,1000,300,false, "GL24h", 1, "S", 1.25);

console.log("El resultado es: ",s);
