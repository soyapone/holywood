var p1 = require('./DesignValues');

//(tipoMadera,servicio,duration,b,h,Ksys,gammaM)
var s = p1.DesignValues( "GL24h", 1, "S",70,70,false, 1.30);

console.log("El resultado es: ",s);
