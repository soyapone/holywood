var p1 = require('./funciones');

var prueba = p1.compresion90Kmod(14752, 90, 70, 0, 30, 1000, 300, false, "GL24h", 0.9, 2.5, 1.25);
console.log("El resultado es: ",prueba);

var prueba = p1.compresion90ServicioDuracion(14752, 90, 70, 0, 30, 1000, 300, false, "GL24h", 1, 'S', 2.5, 1.25);
console.log("El resultado es: ",prueba);


var prueba1 = p1.fc90d(0.9, 2.5, 1.25);

console.log("fc90d: ",prueba1);

var prueba2 = p1.kc90(1000, 300, false, "GL24h");

console.log("kc90: ",prueba2);

var prueba3 = p1.areaEf(90, 70, 0, 30);

console.log("areaEf: ",prueba3);
