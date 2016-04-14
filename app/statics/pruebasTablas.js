// Declaramos las variables que luego usaremos.
// tabla, será el objeto que nos permitirá buscar. Tan sencillo como usar los métodos definidos:
// tabla.find(<<ID>>), esto devolverá todos los datos de la madera.
// (donde <<ID>> es el tipo de madera que queremos buscar)
// Los métodos son: Y SIEMPRE DEVUELVEN UN NÚMERO!!
// getFlexion(<<ID>>)
// getTraccionParalela(<<ID>>)
// getTraccionPerpendicular(<<ID>>)
// getCompresionParalela(<<ID>>)
// getCortante(<<ID>>)
// getModuloParaleloMedio(<<ID>>)
// getModuloParalelo5percentil(<<ID>>)
// getModuloPerpendicularMedio(<<ID>>)
// getModuloCortanteMedio(<<ID>>)
// getDensidadCaracteristica(<<ID>>)
// getDensidadMedia(<<ID>>)

var tabla = require('./tables');
var buscar, a;


// Hacemos tres ejemplos de búsquedas en la tabla.

// Primero buscamos por "C16" y lo guardamos en la variable "buscar" que declaramos arriba
buscar = "C16";
// Le decimos al objeto Tabla, que busque por lo que pusimos en "buscar", que era "C16"
a = tabla.find(buscar);
// Lo mostramos por pantalla, lo que buscamos y los resultados.
console.log("Los valores encontrados para, ",buscar," son: ",a,"\n");

// Aquí buscamos por D70
buscar = "D70";
a = tabla.find(buscar);
console.log("Los valores encontrados para, ",buscar," son: ",a,"\n");

// Aquí buscamos por "putata", devolverá un "undefined"
buscar = "putata";
a = tabla.find(buscar);
console.log("Los valores encontrados para, ",buscar," son: ",a,"\n");

// Pruebas con peticiones de parámetros concretos.
// -----------------------------------------------------
console.log("----------------------------OTRAS PRUEBAS------------------------------\n");

// Buscamos por C16
buscar = "C16";
console.log("La Flexion de: ",buscar," es: ",tabla.getFlexion(buscar));
console.log("La TraccionParalela de: ",buscar," es: ",tabla.getTraccionParalela(buscar));
console.log("La TraccionPerpendicular de: ",buscar," es: ",tabla.getTraccionPerpendicular(buscar));
console.log("La CompresionParalela de: ",buscar," es: ",tabla.getCompresionParalela(buscar));
console.log("La ModuloParaleloMedio de: ",buscar," es: ",tabla.getModuloParaleloMedio(buscar));
console.log("La ModuloParalelo5percentil de: ",buscar," es: ",tabla.getModuloParalelo5percentil(buscar));
console.log("La ModuloPerpendicularMedio de: ",buscar," es: ",tabla.getModuloPerpendicularMedio(buscar));
console.log("La ModuloCortanteMedio de: ",buscar," es: ",tabla.getModuloCortanteMedio(buscar));
console.log("La DensidadCaracteristica de: ",buscar," es: ",tabla.getDensidadCaracteristica(buscar));
console.log("La DensidadMedia de: ",buscar," es: ",tabla.getFlexion(buscar));
console.log("\n");

// Buscamos por putata

buscar = "putata";
console.log("La Flexion de: ",buscar," es: ",tabla.getFlexion(buscar));
console.log("La TraccionParalela de: ",buscar," es: ",tabla.getTraccionParalela(buscar));
console.log("La TraccionPerpendicular de: ",buscar," es: ",tabla.getTraccionPerpendicular(buscar));
console.log("La CompresionParalela de: ",buscar," es: ",tabla.getCompresionParalela(buscar));
console.log("La ModuloParaleloMedio de: ",buscar," es: ",tabla.getModuloParaleloMedio(buscar));
console.log("La ModuloParalelo5percentil de: ",buscar," es: ",tabla.getModuloParalelo5percentil(buscar));
console.log("La ModuloPerpendicularMedio de: ",buscar," es: ",tabla.getModuloPerpendicularMedio(buscar));
console.log("La ModuloCortanteMedio de: ",buscar," es: ",tabla.getModuloCortanteMedio(buscar));
console.log("La DensidadCaracteristica de: ",buscar," es: ",tabla.getDensidadCaracteristica(buscar));
console.log("La DensidadMedia de: ",buscar," es: ",tabla.getFlexion(buscar));
console.log("\n");
