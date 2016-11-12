var tabla = require('./tables');
var fun = require('./funciones');
var _ = require('lodash');

exports.logicalValidation = function() {
  // Solo para hacer pruebas esta funcion no devuelve nada erroneo por
  //if (gammaM == 1) return "gammaM no puede ser 1";
  return;
}


exports.DesignValues = function(tipoMadera,servicio,duration,b,h,Ksys,gammaM){
  var kh;

  if (tabla.isConiferous(tipoMadera)||tabla.isHardwood(tipoMadera)){
    if (h <= 150){
      a = Math.pow((150/h),0.2);
      kh = _.min([a,1.3]);
    } else {
      kh = 1;
    }
  }else if (tabla.isGL(tipoMadera)) {
    if (h <= 600){
      a = Math.pow((600/h),0.1);
      kh = _.min([a,1.1]);
    } else {
      // ##################################################
      //     Esto me lo he inventado preguntar a Mariano
      // ##################################################
      kh = 1;
    }
  }

  var kmod = tabla.findServiceDuracion(servicio,duration);

  var multiplicador = (kmod*kh)/gammaM;
  var fmd;

  if (Ksys){
    fmd = tabla.getfmk(tipoMadera)*1.1;
  } else {
    fmd = tabla.getfmk(tipoMadera);
  }

  var response = {
    'fmd' : fmd,
    'ft0d': tabla.getft0k(tipoMadera)*multiplicador,
    'ft90d' : tabla.getft90k(tipoMadera)*multiplicador,
    'fc0d' : tabla.getfc0k(tipoMadera)*multiplicador,
    'fc90d' : tabla.getfc90k(tipoMadera)*multiplicador,
    'fvd' : tabla.getfvk(tipoMadera)*multiplicador
  };

  // var frgd = tabla.getfrgk(tipoMadera)*multiplicador;
  //
  // if( typeof frgd !== 'undefined' ) {
  //   response.push(
  //     {'frgd' : frgd}
  //   );
  // }

  return response;
}
