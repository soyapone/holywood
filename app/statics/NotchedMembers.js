var tabla = require('./tables');
var fun = require('./funciones');
var _ = require ('lodash');

exports.notchedMembers = function(Vd,b,hef,h,Kcr,d,tipoMadera,x,servicio,duracion, gammaM,notchOnSupport){
  // Considereamos l1 como infinito o el máximo valor para que se cumpla la función de KC90 y en el área eficaz.
  var Kn = tabla.Kn(tipoMadera);
  var TauD = this.TauD(Vd,b,hef,Kcr,tipoMadera);
  var Kv = this.Kv(Kn,hef,d,h,x,notchOnSupport);
  var kmod = tabla.findServiceDuracion(servicio,duracion);
  var Fvd = this.Fvd(tipoMadera,kmod,gammaM);
  var index = TauD / (Kv*Fvd);

  //devolver el Kn, Kv, Fvd, TauD, index
  var response = {
    'Kn' : Kn,
    'Kv' : Kv,
    'Fvd' : Fvd,
    'TauD' : TauD,
    'index': index
  }
  return response;

}

exports.TauD = function(Vd,b,hef,Kcr, ID){
  var multiplicador = 1;

  if (Kcr) {
    if (tabla.isConiferous(ID) || tabla.isHardwood(ID) || tabla.isGL(ID) )
    {
      multiplicador = 0.67;
    } else {
      multiplicador = 1;
    }
  } else {
    multiplicador = 1;
  }

  return (1.5 * Vd) / (b * hef * multiplicador);
}

exports.Kv = function(Kn,hef,d,h,x,notchOnSupport) {
  if (notchOnSupport){
    var i = d/ (h-hef);
    var alfa = hef/h;

    var FactorA = Kn * (1+ (1.1 * Math.pow(i, 1.5))/Math.sqrt(h));
    var FactorB = Math.sqrt(h) * ((Math.sqrt(alfa*(1-alfa))) + (0.8*(x/h)*Math.sqrt((1/alfa)-(Math.pow(alfa,2)))));

    var A = FactorA/FactorB;

    return _.min([1,A]);
  } else {
    return 1;
  }
}

exports.Fvd = function(tipoMadera,Kmod, gammaM) {
  return fun.valorDeCalculo(Kmod, tabla.getfvk(tipoMadera), gammaM);
}
