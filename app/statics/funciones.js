var tabla = require('./tables');
var buscar, a;

function funcionLoca(ID,Numero,OtroNumero){
  var traccionParalela = tabla.getTraccionParalela(ID);
  var SubResultado = traccionParalela / Numero;
  var SubResultado2 = Math.sqrt(SubResultado);
  var SubResultado3 = (SubResultado2 + SubResultado)*OtroNumero;
  return SubResultado3;

}

var resultado = funcionLoca("C16", 5, 6);

console.log("El resultado de llamar a la funciónLoca es: ", resultado);
