// Load the full build.
var _ = require('lodash');

var propiedadesMadera = [
  {
    "ID": "C14",
    "fmk": 14,
    "ft0k": 8,
    "ft90k": 0.4,
    "fc0k": 16,
    "fc90k": 2,
    "fvk": 3,
    "E0mean": 7,
    "E005": 4.7,
    "E90mean": 0.23,
    "Gmean": 0.44,
    "rhok": 290,
    "rhomean": 350

  },
  {
    "ID": "C16",
    "fmk": 16,
    "ft0k": 10,
    "ft90k": 0.4,
    "fc0k": 17,
    "fc90k": 2.2,
    "fvk": 3.2,
    "E0mean": 8,
    "E005": 5.4,
    "E90mean": 0.27,
    "Gmean": 0.5,
    "rhok": 310,
    "rhomean": 370
  },
  {
    "ID": "C18",
    "fmk": 18,
    "ft0k": 11,
    "ft90k": 0.4,
    "fc0k": 18,
    "fc90k": 2.2,
    "fvk": 3.4,
    "E0mean": 9,
    "E005": 6,
    "E90mean": 0.3,
    "Gmean": 0.56,
    "rhok": 320,
    "rhomean": 380

  },
  {
    "ID": "C20",
    "fmk": 20,
    "ft0k": 12,
    "ft90k": 0.4,
    "fc0k": 19,
    "fc90k": 2.3,
    "fvk": 3.6,
    "E0mean": 9.5,
    "E005": 6.4,
    "E90mean": 0.32,
    "Gmean": 0.59,
    "rhok": 330,
    "rhomean": 390

  },
  {
    "ID": "C22",
    "fmk": 22,
    "ft0k": 13,
    "ft90k": 0.4,
    "fc0k": 20,
    "fc90k": 2.4,
    "fvk": 3.8,
    "E0mean": 10,
    "E005": 6.7,
    "E90mean": 0.33,
    "Gmean": 0.63,
    "rhok": 340,
    "rhomean": 410

  },
  {
    "ID": "C24",
    "fmk": 24,
    "ft0k": 14,
    "ft90k": 0.4,
    "fc0k": 21,
    "fc90k": 2.5,
    "fvk": 4,
    "E0mean": 11,
    "E005": 7.4,
    "E90mean": 0.37,
    "Gmean": 0.69,
    "rhok": 350,
    "rhomean": 420

  },
  {
    "ID": "C27",
    "fmk": 27,
    "ft0k": 16,
    "ft90k": 0.4,
    "fc0k": 22,
    "fc90k": 2.6,
    "fvk": 4,
    "E0mean": 11.5,
    "E005": 7.7,
    "E90mean": 0.38,
    "Gmean": 0.72,
    "rhok": 370,
    "rhomean": 450

  },
  {
    "ID": "C30",
    "fmk": 30,
    "ft0k": 18,
    "ft90k": 0.4,
    "fc0k": 23,
    "fc90k": 2.7,
    "fvk": 4,
    "E0mean": 12,
    "E005": 8,
    "E90mean": 0.4,
    "Gmean": 0.75,
    "rhok": 380,
    "rhomean": 460

  },
  {
    "ID": "C35",

    "fmk": 35,
    "ft0k": 21,
    "ft90k": 0.4,
    "fc0k": 25,
    "fc90k": 2.8,
    "fvk": 4,
    "E0mean": 13,
    "E005": 8.7,
    "E90mean": 0.43,
    "Gmean": 0.81,
    "rhok": 400,
    "rhomean": 480

  },
  {
    "ID": "C40",
    "fmk": 40,
    "ft0k": 24,
    "ft90k": 0.4,
    "fc0k": 26,
    "fc90k": 2.9,
    "fvk": 4,
    "E0mean": 14,
    "E005": 9.4,
    "E90mean": 0.47,
    "Gmean": 0.88,
    "rhok": 420,
    "rhomean": 500

  },
  {
    "ID": "C45",
    "fmk": 45,
    "ft0k": 27,
    "ft90k": 0.4,
    "fc0k": 27,
    "fc90k": 3.1,
    "fvk": 4,
    "E0mean": 15,
    "E005": 10,
    "E90mean": 0.5,
    "Gmean": 0.94,
    "rhok": 440,
    "rhomean": 520

  },
  {
    "ID": "C50",
    "fmk": 50,
    "ft0k": 30,
    "ft90k": 0.4,
    "fc0k": 29,
    "fc90k": 3.2,
    "fvk": 4,
    "E0mean": 16,
    "E005": 10.7,
    "E90mean": 0.53,
    "Gmean": 1,
    "rhok": 460,
    "rhomean": 550

  },
  {
    "ID": "D18",
    "fmk": 18,
    "ft0k": 11,
    "ft90k": 0.6,
    "fc0k": 18,
    "fc90k": 7.5,
    "fvk": 3.4,
    "E0mean": 9.5,
    "E005": 8,
    "E90mean": 0.63,
    "Gmean": 0.59,
    "rhok": 475,
    "rhomean": 570

  },
  {
    "ID": "D24",
    "fmk": 24,
    "ft0k": 14,
    "ft90k": 0.6,
    "fc0k": 21,
    "fc90k": 7.8,
    "fvk": 4,
    "E0mean": 10,
    "E005": 8.5,
    "E90mean": 0.67,
    "Gmean": 0.62,
    "rhok": 485,
    "rhomean": 580

  },
  {
    "ID": "D30",
    "fmk": 30,
    "ft0k": 18,
    "ft90k": 0.6,
    "fc0k": 23,
    "fc90k": 8,
    "fvk": 4,
    "E0mean": 11,
    "E005": 9.2,
    "E90mean": 0.73,
    "Gmean": 0.69,
    "rhok": 530,
    "rhomean": 640

  },
  {
    "ID": "D35",
    "fmk": 35,
    "ft0k": 21,
    "ft90k": 0.6,
    "fc0k": 25,
    "fc90k": 8.1,
    "fvk": 4,
    "E0mean": 12,
    "E005": 10.1,
    "E90mean": 0.8,
    "Gmean": 0.75,
    "rhok": 540,
    "rhomean": 650

  },
  {
    "ID": "D40",
    "fmk": 40,
    "ft0k": 24,
    "ft90k": 0.6,
    "fc0k": 26,
    "fc90k": 8.3,
    "fvk": 4,
    "E0mean": 13,
    "E005": 10.9,
    "E90mean": 0.86,
    "Gmean": 0.81,
    "rhok": 550,
    "rhomean": 660

  },
  {
    "ID": "D50",
    "fmk": 50,
    "ft0k": 30,
    "ft90k": 0.6,
    "fc0k": 29,
    "fc90k": 9.3,
    "fvk": 4,
    "E0mean": 14,
    "E005": 11.8,
    "E90mean": 0.93,
    "Gmean": 0.88,
    "rhok": 620,
    "rhomean": 750
  },
  {
    "ID": "D60",
    "fmk": 60,
    "ft0k": 36,
    "ft90k": 0.6,
    "fc0k": 32,
    "fc90k": 10.5,
    "fvk": 4.5,
    "E0mean": 17,
    "E005": 14.3,
    "E90mean": 1.13,
    "Gmean": 1.06,
    "rhok": 700,
    "rhomean": 840

  },
  {
    "ID": "D70",
    "fmk": 70,
    "ft0k": 42,
    "ft90k": 0.6,
    "fc0k": 34,
    "fc90k": 13.5,
    "fvk": 5,
    "E0mean": 20,
    "E005": 16.8,
    "E90mean": 1.33,
    "Gmean": 1.25,
    "rhok": 900,
    "rhomean": 1080

  },
  {
    "ID": "GL20h",
    "fmk": 20,
    "ft0k": 16,
    "ft90k": 0.5,
    "fc0k": 20,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 8400,
    "E005": 7000,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":540,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 340,
    "rhomean": 370

  },
  {
    "ID": "GL22h",
    "fmk": 22,
    "ft0k": 17.6,
    "ft90k": 0.5,
    "fc0k": 22,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 10500,
    "E005": 8800,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":540,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 370,
    "rhomean": 410

  },
  {
    "ID": "GL24h",
    "fmk": 24,
    "ft0k": 19.2,
    "ft90k": 0.5,
    "fc0k": 24,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 11500,
    "E005": 9600,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":540,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 385,
    "rhomean": 420

  },
  {
    "ID": "GL26h",
    "fmk": 26,
    "ft0k": 20.8,
    "ft90k": 0.5,
    "fc0k": 26,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 12100,
    "E005": 10100,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":540,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 405,
    "rhomean": 445
  },
  {
    "ID": "GL28h",
    "fmk": 28,
    "ft0k": 22.3,
    "ft90k": 0.5,
    "fc0k": 28,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 12600,
    "E005": 10500,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":540,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 425,
    "rhomean": 460

  },
  {
    "ID": "GL30h",
    "fmk": 30,
    "ft0k": 24,
    "ft90k": 0.5,
    "fc0k": 30,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 13600,
    "E005": 11300,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":540,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 430,
    "rhomean": 480
  },
  {
    "ID": "GL32h",
    "fmk": 32,
    "ft0k": 25.6,
    "ft90k": 0.5,
    "fc0k": 32,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 14200,
    "E005": 11800,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":540,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 440,
    "rhomean": 490

  },
  {
    "ID": "GL20c",
    "fmk": 20,
    "ft0k": 15,
    "ft90k": 0.5,
    "fc0k": 18.5,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 10400,
    "E005": 8600,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":542,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 355,
    "rhomean": 390

  },
  {
    "ID": "GL22c",
    "fmk": 22,
    "ft0k": 16,
    "ft90k": 0.5,
    "fc0k": 20,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 10400,
    "E005": 8600,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":542,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 355,
    "rhomean": 390

  },
  {
    "ID": "GL24c",
    "fmk": 24,
    "ft0k": 17,
    "ft90k": 0.5,
    "fc0k": 21.5,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 11000,
    "E005": 9100,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":542,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 365,
    "rhomean": 400

  },
  {
    "ID": "GL26c",
    "fmk": 26,
    "ft0k": 19,
    "ft90k": 0.5,
    "fc0k": 23.5,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 12000,
    "E005": 10000,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":542,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 385,
    "rhomean": 420

  },
  {
    "ID": "GL28c",
    "fmk": 28,
    "ft0k": 19.5,
    "ft90k": 0.5,
    "fc0k": 24,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 12500,
    "E005": 10400,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":542,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 390,
    "rhomean": 420

  },
  {
    "ID": "GL30c",
    "fmk": 30,
    "ft0k": 19.5,
    "ft90k": 0.5,
    "fc0k": 24.5,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 13000,
    "E005": 10800,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":542,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 390,
    "rhomean": 430

  },
  {
    "ID": "GL32c",
    "fmk": 32,
    "ft0k": 19.5,
    "ft90k": 0.5,
    "fc0k": 24.5,
    "fc90k": 2.5,
    "fvk": 3.5,
    "frgk": 1.2,
    "E0mean": 13500,
    "E005": 11200,
    "E90mean": 300,
    "E90-05": 250,
    "Gmean": 650,
    "G05":542,
    "Grmean": 65,
    "Gr05":54,
    "rhok": 400,
    "rhomean": 440

  }

];

var kmod = [
  {
    "Servicio": 1,
    "Permanente": 0.6,
    "Larga": 0.7,
    "Media": 0.8,
    "Corta": 0.9,
    "Instantanea": 1.1
  },
  {
    "Servicio": 2,
    "Permanente": 0.6,
    "Larga": 0.7,
    "Media": 0.8,
    "Corta": 0.9,
    "Instantanea": 1.1
  },
  {
    "Servicio": 3,
    "Permanente": 0.5,
    "Larga": 0.55,
    "Media": 0.65,
    "Corta": 0.7,
    "Instantanea": 0.9
  }
]


const ServiceTypes = ["P","L","M","S","I"];

var MaderaTypes = [];

exports.findService = function(servicio){
  return _.find(kmod , function (o) { return o.Servicio == servicio});
}

exports.findServiceDuracion = function(servicio,duracion){
  if (duracion === "P"){
    return this.findServicePermanente(servicio);
  }
  if (duracion === "L"){
    return this.findServiceLarga(servicio);
  }
  if (duracion === "M"){
    return this.findServiceMedia(servicio);
  }
  if (duracion === "S"){
    return this.findServiceCorta(servicio);
  }
  if (duracion === "I"){
    return this.findServiceInstantanea(servicio);
  }
}

exports.findServiceTypes = function(servicio){
  return ServiceTypes;
}

exports.findServicePermanente = function(servicio){
  var fila = this.findService(servicio);
  if (typeof fila !== 'undefined'){
    return fila.Permanente;
  }
}

exports.findServiceLarga = function(servicio){
  var fila = this.findService(servicio);
  if (typeof fila !== 'undefined'){
    return fila.Larga;
  }
}

exports.findServiceMedia = function(servicio){
  var fila = this.findService(servicio);
  if (typeof fila !== 'undefined'){
    return fila.Media;
  }
}

exports.findServiceCorta = function(servicio){
  var fila = this.findService(servicio);
  if (typeof fila !== 'undefined'){
    return fila.Corta;
  }
}

exports.findServiceInstantanea = function(servicio){
  var fila = this.findService(servicio);
  if (typeof fila !== 'undefined'){
    return fila.Instantanea;
  }
}

exports.find = function(ID) {
  return _.find(propiedadesMadera, function(o) { return o.ID == ID; });
}

exports.findMaderaTypes =function(){
  if (typeof MaderaTypes !== 'undefined' && MaderaTypes.length > 0){
    return MaderaTypes;
  } else {
    propiedadesMadera.forEach(function(value){
      MaderaTypes.push(value.ID);
    });
    // añadir maderas extra
    //MaderaTypes.push("GL24h");
  }
  return MaderaTypes;
}

exports.getfmk = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.fmk;
  }
}

exports.getft0k = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.ft0k;
  }
}

exports.getft90k = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.ft90k;
  }
}

exports.getfc90k = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.fc90k;
  }
}

exports.getfc0k = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.fc0k;
  }
}

exports.getfvk = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.fvk;
  }
}

exports.getE0mean = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.E0mean;
  }
}

exports.getE005 = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.E005;
  }
}

exports.getE90mean = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.E90mean;
  }
}

exports.getGmean = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.Gmean;
  }
}

exports.getrhok = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.rhok;
  }
}

exports.getrhomean = function (ID){
  var col = this.find(ID);
  if (typeof col !== 'undefined'){
    return col.rhomean;
  }
}



exports.isConiferous = function (ID){
  return (ID === "C14" || ID ==="C16" || ID ==="C18" || ID ==="C22" || ID ==="C24" || ID ==="C27" || ID ==="C30" || ID ==="C35" || ID ==="C40" || ID ==="C45" || ID ==="C50")
}

exports.isGL = function (ID){
  return (ID === "GL24h" || ID ==="GL28h" || ID ==="GL32h" || ID ==="GL36h" || ID === "GL24c" || ID ==="GL28c" || ID ==="GL32c" || ID ==="GL36c" )
}

exports.isHardwood = function (ID){
  return (ID === "D18" || ID ==="D24" || ID ==="D30" || ID ==="D35" || ID === "D40" || ID ==="D50" || ID ==="D60" || ID ==="D70" )
}

exports.Kn = function (ID){
  if (this.isConiferous(ID) || this.isHardwood(ID))
  {
    return 5;
  } else if (this.isGL(ID)) {
    return 6.5;
  } else {
    return 4.5;
  }
}

// console.log(this.findServiceDuracion(1,"C"));
