(function(){
  var app = angular.module('myApp', [ ]);

  app.controller('InicializadorController', function(){
    this.products = gems;
  });

  app.controller('CalculoController', ['$scope', '$http', '$log', function($scope,$http,$log){
    var cal = this;


    this.sendCalculation = function(){
      // mandar hacer el cálculo
      //alert("Alerta me han mandado un calculation!");
      //this.calculation.resultado = "";
      //http://localhost:3705/CompressionPerpendicularToTheGrain/?Fd=14752&b=90&l=70&a1=0&a2=30&l1=1000&h=300&Continuous=false&s=GL24h&service=1&LoadDuration=S&gammaM=1.25&format=xml
      //
      var myurl = '/CompressionPerpendicularToTheGrain/'
      +'?Fd='+cal.calculation.Fd+'&b='+cal.calculation.b
      +'&l='+cal.calculation.l+'&a1='+cal.calculation.a1
      +'&a2='+cal.calculation.a2+'&l1='+cal.calculation.l1
      +'&h='+cal.calculation.h+'&Continuous='+cal.calculation.Continuous
      +'&s='+cal.calculation.woodtype+'&service='+cal.calculation.service
      +'&LoadDuration='+cal.calculation.LoadDuration
      +'&gammaM='+cal.calculation.gammaM+'&format=json';

      $http({
        method: 'GET',
        url: myurl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          // Aquí no podemos poner THIS!!
          //alert(JSON.stringify(response.data.index, null, 4));
          $scope.sigmaC90d = response.data.sigmaC90d;
          $scope.fc90d = response.data.fc90d;
          $scope.areaEf = response.data.areaEf;
          $scope.kc90 = response.data.kc90;
          $scope.index = response.data.index;

          if ($scope.index <= 1) {
            $scope.myColor = "#00FF00";
          } else {
            $scope.myColor = "#FF0000";
          }

          // cal.calculation.result.sigmaC90d = response.data.sigmaC90d;
          // cal.calculation.result.fc90d = response.data.fc90d;
          // cal.calculation.result.areaEf = response.data.areaEf;
          // cal.calculation.result.index = response.data.index;


        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          // Aquí no podemos poner THIS!!
          cal.calculation.result = 'There´s an error connecting with the server.';
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
