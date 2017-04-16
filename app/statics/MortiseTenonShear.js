var tables = require('./tables');
var fun = require('./funciones');
var _ = require('lodash');


exports.logicalValidation = function(sc, lc, v, service, hs, LoadDuration, hc, b, gammaM, hi) {
  // Hace todas las comprobaciones lógicas
  //if (gammaM == 1) return "gammaM no puede ser 1";
  var h = hs+hc+hi;
  if (!(hs >= hi)) return "hs must be higher or equal than hi";
  if (!((15 <= lc) || (lc <= 60))) return "lc must be a value between 15 and 60 mm";
  var exp1 = h/b;
  if (!((1.5 <= exp1) || (exp1 <= 2.5))) return "h/b must be a value between 1.5 and 2.5 (h = hs+hc+hi)";

  exp1 = hi/h;
  if (!(exp1 <= (1/3))) return "hi/h must be lower or equal than 1/3 (h = hs+hc+hi)";
  exp1 = h/6;
  if (!(hc >= exp1)) return "hc must be higher or equal than h/6 (h = hs+hc+hi)";
  if (!(v <= 0.4*h)) return "v must be lower or equal than 0.4h (h = hs+hc+hi)";
  return;
}


exports.function = function(sc, lc, v, service, hs, LoadDuration, hc, b, gammaM, hi){
 var h = hs+hc+hi;
 var he = hs+hc;
 var beta = hc/he;
 var alfa = he/h;

 var kz = beta*(1+2*Math.pow((1-beta),2))*(2-alfa);

var kmod = tables.findServiceDuracion(service,LoadDuration);

 var lcef = _.min([(lc+30), (2*lc)]);
 var Kcr = fun.Kcr(sc);
 var Kv,Rk,Rd;
 var FactorA, FactorB;

 if(hi == 0){
    Kv = 1;
 } else{
   FactorB = Math.sqrt(h) * ((Math.sqrt(alfa*(1-alfa))) + (0.8*(v/h)*Math.sqrt((1/alfa)-(Math.pow(alfa,2)))));;
   Kv = _.min([1,FactorB]);
 }

 FactorA = (2/3)*Kcr*b*he*kz*Kv*tables.getfvk(sc);
 FactorB = 1.7*b*lcef*tables.getfc90k(sc);

 Rk = _.min([FactorA,FactorB]);

 Rd = fun.valorDeCalculo(kmod, Rk, gammaM);

 var response = {
   'Kv' : Kv,
   'Rk' : Rk,
   'Rd' : Rd
 };
 return response;
}
