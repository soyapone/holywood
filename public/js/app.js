(function(){
  var app = angular.module('myApp', [ ]);

  app.controller('InicializadorController', function(){
    this.products = gems;
  });

  app.controller('CalculoController', [ '$http', '$log', function($http,$log){
    var cal = this;

    this.sendCalculo = function(){
      // mandar hacer el cálculo
      //alert("Alerta me han mandado un calculo!");
      //this.calculo.resultado = "";
      var myurl = '../JSON/calculo2?var1='+cal.calculo.operando1+"&var2="+cal.calculo.operando2;
      $http({
        method: 'GET',
        url: myurl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          // Aquí no podemos poner THIS!!
          cal.calculo.resultado = response.data.result;
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          // Aquí no podemos poner THIS!!
          cal.calculo.resultado = 'There´s an error connecting with the server.';
        });

    };
  }]);



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
