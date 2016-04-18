(function(){
  var app = angular.module('myApp', [ ]);

  app.controller('InicializadorController', function(){
    this.products = gems;
  });

  app.controller('CalculoController', function(){
    this.calculo = {};

    this.sendCalculo = function(){
      // mandar hacer el cálculo
      alert("Alerta me han mandado un calculo!");
      this.calculo = {};
    };
  });



var gems = [
{
  name: 'Dodecaedro',
  price: 2.95,
  description: 'esta es la descripcion',
  canPurchase: false
},
{
  name: 'Gema superchula',
  price: 17.00,
  description: 'Gema que te cagas de chuli',
  canPurchase: true
}

]

})();
