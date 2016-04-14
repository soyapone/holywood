// Load the full build.
var _ = require('lodash');

var tabla = [
  {
    "ID": "C14",
    "Flexion": 14,
    "TraccionParalela": 8,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 16,
    "CompresionPerpendicular": 2,
    "Cortante": 3,
    "ModuloParaleloMedio": 7,
    "ModuloParalelo5percentil": 4.7,
    "ModuloPerpendicularMedio": 0.23,
    "ModuloCortanteMedio": 0.44,
    "DensidadCaracteristica": 290,
    "DensidadMedia": 350

  },
 {
    "ID": "C16",
    "Flexion": 16,
    "TraccionParalela": 10,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 17,
    "CompresionPerpendicular": 2.2,
    "Cortante": 3.2,
    "ModuloParaleloMedio": 8,
    "ModuloParalelo5percentil": 5.4,
    "ModuloPerpendicularMedio": 0.27,
    "ModuloCortanteMedio": 0.5,
    "DensidadCaracteristica": 310,
    "DensidadMedia": 370
  },
   {
    "ID": "C18",
    "Flexion": 18,
    "TraccionParalela": 11,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 18,
    "CompresionPerpendicular": 2.2,
    "Cortante": 3.4,
    "ModuloParaleloMedio": 9,
    "ModuloParalelo5percentil": 6,
    "ModuloPerpendicularMedio": 0.3,
    "ModuloCortanteMedio": 0.56,
    "DensidadCaracteristica": 320,
    "DensidadMedia": 380

  },
  {
    "ID": "C20",
    "Flexion": 20,
    "TraccionParalela": 12,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 19,
    "CompresionPerpendicular": 2.3,
    "Cortante": 3.6,
    "ModuloParaleloMedio": 9.5,
    "ModuloParalelo5percentil": 6.4,
    "ModuloPerpendicularMedio": 0.32,
    "ModuloCortanteMedio": 0.59,
    "DensidadCaracteristica": 330,
    "DensidadMedia": 390

  },
   {
    "ID": "C22",
    "Flexion": 22,
    "TraccionParalela": 13,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 20,
    "CompresionPerpendicular": 2.4,
    "Cortante": 3.8,
    "ModuloParaleloMedio": 10,
    "ModuloParalelo5percentil": 6.7,
    "ModuloPerpendicularMedio": 0.33,
    "ModuloCortanteMedio": 0.63,
    "DensidadCaracteristica": 340,
    "DensidadMedia": 410

  },
   {
    "ID": "C24",
    "Flexion": 24,
    "TraccionParalela": 14,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 21,
    "CompresionPerpendicular": 2.5,
    "Cortante": 4,
    "ModuloParaleloMedio": 11,
    "ModuloParalelo5percentil": 7.4,
    "ModuloPerpendicularMedio": 0.37,
    "ModuloCortanteMedio": 0.69,
    "DensidadCaracteristica": 350,
    "DensidadMedia": 420

  },
  {
    "ID": "C27",
    "Flexion": 27,
    "TraccionParalela": 16,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 22,
    "CompresionPerpendicular": 2.6,
    "Cortante": 4,
    "ModuloParaleloMedio": 11.5,
    "ModuloParalelo5percentil": 7.7,
    "ModuloPerpendicularMedio": 0.38,
    "ModuloCortanteMedio": 0.72,
    "DensidadCaracteristica": 370,
    "DensidadMedia": 450

  },
 {
    "ID": "C30",
    "Flexion": 30,
    "TraccionParalela": 18,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 23,
    "CompresionPerpendicular": 2.7,
    "Cortante": 4,
    "ModuloParaleloMedio": 12,
    "ModuloParalelo5percentil": 8,
    "ModuloPerpendicularMedio": 0.4,
    "ModuloCortanteMedio": 0.75,
    "DensidadCaracteristica": 380,
    "DensidadMedia": 460

  },
  {
    "ID": "C35",
    "Cortante": 3.4,
    "Flexion": 35,
    "TraccionParalela": 21,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 25,
    "CompresionPerpendicular": 2.8,
    "Cortante": 4,
    "ModuloParaleloMedio": 13,
    "ModuloParalelo5percentil": 8.7,
    "ModuloPerpendicularMedio": 0.43,
    "ModuloCortanteMedio": 0.81,
    "DensidadCaracteristica": 400,
    "DensidadMedia": 480

  },
 {
    "ID": "C40",
    "Flexion": 40,
    "TraccionParalela": 24,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 26,
    "CompresionPerpendicular": 2.9,
    "Cortante": 4,
    "ModuloParaleloMedio": 14,
    "ModuloParalelo5percentil": 9.4,
    "ModuloPerpendicularMedio": 0.47,
    "ModuloCortanteMedio": 0.88,
    "DensidadCaracteristica": 420,
    "DensidadMedia": 500

  },
 {
    "ID": "C45",
    "Flexion": 45,
    "TraccionParalela": 27,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 27,
    "CompresionPerpendicular": 3.1,
    "Cortante": 4,
    "ModuloParaleloMedio": 15,
    "ModuloParalelo5percentil": 10,
    "ModuloPerpendicularMedio": 0.5,
    "ModuloCortanteMedio": 0.94,
    "DensidadCaracteristica": 440,
    "DensidadMedia": 520

  },
 {
    "ID": "C50",
    "Flexion": 50,
    "TraccionParalela": 30,
    "TraccionPerpendicular": 0.4,
    "CompresionParalela": 29,
    "CompresionPerpendicular": 3.2,
    "Cortante": 4,
    "ModuloParaleloMedio": 16,
    "ModuloParalelo5percentil": 10.7,
    "ModuloPerpendicularMedio": 0.53,
    "ModuloCortanteMedio": 1,
    "DensidadCaracteristica": 460,
    "DensidadMedia": 550

  },
 {
    "ID": "D18",
    "Flexion": 18,
    "TraccionParalela": 11,
    "TraccionPerpendicular": 0.6,
    "CompresionParalela": 18,
    "CompresionPerpendicular": 7.5,
    "ModuloParaleloMedio": 9.5,
    "ModuloParalelo5percentil": 8,
    "ModuloPerpendicularMedio": 0.63,
    "ModuloCortanteMedio": 0.59,
    "DensidadCaracteristica": 475,
    "DensidadMedia": 570

  },
  {
    "ID": "D24",
    "Flexion": 24,
    "TraccionParalela": 14,
    "TraccionPerpendicular": 0.6,
    "CompresionParalela": 21,
    "CompresionPerpendicular": 7.8,
    "Cortante": 4,
    "ModuloParaleloMedio": 10,
    "ModuloParalelo5percentil": 8.5,
    "ModuloPerpendicularMedio": 0.67,
    "ModuloCortanteMedio": 0.62,
    "DensidadCaracteristica": 485,
    "DensidadMedia": 580

  },
  {
    "ID": "D30",
    "Flexion": 30,
    "TraccionParalela": 18,
    "TraccionPerpendicular": 0.6,
    "CompresionParalela": 23,
    "CompresionPerpendicular": 8,
    "Cortante": 4,
    "ModuloParaleloMedio": 11,
    "ModuloParalelo5percentil": 9.2,
    "ModuloPerpendicularMedio": 0.73,
    "ModuloCortanteMedio": 0.69,
    "DensidadCaracteristica": 530,
    "DensidadMedia": 640

  },
   {
    "ID": "D35",
    "Flexion": 35,
    "TraccionParalela": 21,
    "TraccionPerpendicular": 0.6,
    "CompresionParalela": 25,
    "CompresionPerpendicular": 8.1,
    "Cortante": 4,
    "ModuloParaleloMedio": 12,
    "ModuloParalelo5percentil": 10.1,
    "ModuloPerpendicularMedio": 0.8,
    "ModuloCortanteMedio": 0.75,
    "DensidadCaracteristica": 540,
    "DensidadMedia": 650

  },
 {
    "ID": "D40",
    "Flexion": 40,
    "TraccionParalela": 24,
    "TraccionPerpendicular": 0.6,
    "CompresionParalela": 26,
    "CompresionPerpendicular": 8.3,
    "Cortante": 4,
    "ModuloParaleloMedio": 13,
    "ModuloParalelo5percentil": 10.9,
    "ModuloPerpendicularMedio": 0.86,
    "ModuloCortanteMedio": 0.81,
    "DensidadCaracteristica": 550,
    "DensidadMedia": 660

  },
  {
    "ID": "D50",
    "Flexion": 50,
    "TraccionParalela": 30,
    "TraccionPerpendicular": 0.6,
    "CompresionParalela": 29,
    "CompresionPerpendicular": 9.3,
    "Cortante": 4,
    "ModuloParaleloMedio": 14,
    "ModuloParalelo5percentil": 11.8,
    "ModuloPerpendicularMedio": 0.93,
    "ModuloCortanteMedio": 0.88,
    "DensidadCaracteristica": 620,
    "DensidadMedia": 750
  },
 {
    "ID": "D60",
    "Flexion": 60,
    "TraccionParalela": 36,
    "TraccionPerpendicular": 0.6,
    "CompresionParalela": 32,
    "CompresionPerpendicular": 10.5,
    "Cortante": 4.5,
    "ModuloParaleloMedio": 17,
    "ModuloParalelo5percentil": 14.3,
    "ModuloPerpendicularMedio": 1.13,
    "ModuloCortanteMedio": 1.06,
    "DensidadCaracteristica": 700,
    "DensidadMedia": 840

  },
 {
    "ID": "D70",
    "Flexion": 70,
    "TraccionParalela": 42,
    "TraccionPerpendicular": 0.6,
    "CompresionParalela": 34,
    "CompresionPerpendicular": 13.5,
    "Cortante": 5,
    "ModuloParaleloMedio": 20,
    "ModuloParalelo5percentil": 16.8,
    "ModuloPerpendicularMedio": 1.33,
    "ModuloCortanteMedio": 1.25,
    "DensidadCaracteristica": 900,
    "DensidadMedia": 1080

  }
];

function find(ID) {
    return _.find(tabla, function(o) { return o.ID == ID; });
}

function getFlexion(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.TraccionPerpendicular;
   }
}

function getTraccionParalela(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.TraccionParalela;
   }
}

function getTraccionPerpendicular(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.TraccionPerpendicular;
   }
}

function getCompresionParalela(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.CompresionParalela;
   }
}

function getCortante(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.Cortante;
   }
}

function getModuloParaleloMedio(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.ModuloParaleloMedio;
   }
}

function getModuloParalelo5percentil(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.ModuloParalelo5percentil;
   }
}

function getModuloPerpendicularMedio(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.ModuloPerpendicularMedio;
   }
}

function getModuloCortanteMedio(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.ModuloPerpendicularMedio;
   }
}

function getDensidadCaracteristica(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.ModuloPerpendicularMedio;
   }
}

function getDensidadMedia(ID){
 var col = find(ID);
   if (typeof col !== 'undefined'){
     return col.DensidadMedia;
   }
}

console.log(getTraccionPerpendicular("D70"));
